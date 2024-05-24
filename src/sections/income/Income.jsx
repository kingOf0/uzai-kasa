import {View} from 'react-native';
import React, {useState} from 'react';
import {showToast} from '../../utils/Utils';
import {IncomeAddModal} from './IncomeAddModal';
import {IncomeListModal} from './IncomeListModal';
import {storage} from '../../App';

function saveData(value) {
    const year = new Date().getFullYear();
    const key = 'income-' + year;
    const data = JSON.parse(storage.getString(key) || '[]');

    if (value.operation === 'edit') {
        const index = data.findIndex(item => item.id === value.id);
        if (index === -1) {
            showToast('Bir hata oluştu #1641 (value.id: ' + value.id + ')');
            return;
        }
        data[index] = {
            price: value.price,
            date: value.date,
            description: value.description,
            id: value.id,
        };
        showToast('Gelir güncellendi: ' + value.price + '₺');
    } else {
        data.push({
            price: value.price,
            date: value.date,
            description: value.description,
            id: value.id,
        });
        showToast('Gelir eklendi: ' + value.price + '₺');
    }

    storage.set(key, JSON.stringify(data));

    if (value.operation === 'edit') {
        storage.set(
            'money',
            (storage.getNumber('money') || 0) + value.price - value.oldPrice,
        );
    } else {
        storage.set('money', (storage.getNumber('money') || 0) + value.price);
    }
}

export function Income() {
    const [showAddModal, setShowMoneyAddModal] = useState(false);
    const [editValues, setEditValues] = useState(undefined);

    function showMoneyAddModal(editValues) {

        setShowMoneyAddModal(true);
        setEditValues(editValues);
    }

    function onShowModalClose(value) {
        setShowMoneyAddModal(false);
        setEditValues(undefined);

        if (value && value.price) {
            saveData(value);
        }
    }

    return (
        <View
            style={{
                flex: 1,
            }}>
            {showAddModal ? (
                <IncomeAddModal
                    onClose={onShowModalClose}
                    editValues={editValues}
                />
            ) : (
                <IncomeListModal showMoneyAddModal={showMoneyAddModal} />
            )}
        </View>
    );
}
