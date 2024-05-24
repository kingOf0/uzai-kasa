import {Text, View} from 'react-native';
import {useState} from 'react';
import {showToast} from '../../utils/Utils';
import {storage} from '../../App';
import {OutcomeListModal} from './OutcomeListModal';
import {OutcomeAddModal} from './OutcomeAddModal';

function saveData(value) {
    const date = new Date();
    const key = 'outcome-' + date.getFullYear() + '-' + date.getMonth();
    const data = JSON.parse(storage.getString(key) || '[]');

    if (value.operation === 'edit') {
        const index = data.findIndex(item => item.id === value.id);
        if (index === -1) {
            showToast('Bir hata oluştu #1741');
            return;
        }
        data[index] = {
            price: value.price,
            date: value.date,
            description: value.description,
            id: value.id,
        };
        showToast('Gider güncellendi: ' + value.price + '₺');
    } else {
        data.push({
            price: value.price,
            date: value.date,
            description: value.description,
            id: value.id,
        });
        showToast('Gider eklendi: ' + value.price + '₺');
    }

    storage.set(key, JSON.stringify(data));

    if (value.operation === 'edit') {
        storage.set(
            'money',
            (storage.getNumber('money') || 0) - value.price + value.oldPrice,
        );
    } else {
        storage.set('money', (storage.getNumber('money') || 0) - value.price);
    }
}

export function Outcome() {
    const [show, setShow] = useState(false);
    const [defaultValues, setDefaultValues] = useState(undefined);

    function showModal(defaultValues) {
        setShow(true);
        setDefaultValues(defaultValues);
    }

    function onClose(value) {
        setShow(false);
        setDefaultValues(undefined);

        if (value && value.price) {
            saveData(value);
        }
    }

    return (
        <View
            style={{
                flex: 1,
            }}>
            {show ? (
                <OutcomeAddModal onClose={onClose} defaultValues={defaultValues}/>
            ) : (
                <OutcomeListModal showModal={showModal} />
            )}
        </View>
    );
}
