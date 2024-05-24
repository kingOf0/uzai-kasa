import {Button, Text, TextInput, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {localizeDate, nextId} from '../../utils/Utils';
import React, {useState} from 'react';

export function OutcomeAddModal({onClose, defaultValues}) {
    const [price, onChangePrice] = useState(
        defaultValues?.price?.toString() || '',
    );
    const [description, onChangeDescription] = useState(
        defaultValues?.description || '',
    );

    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [date, setDate] = useState(defaultValues?.date || new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDateTimePicker(false);
        setDate(currentDate);
    };

    const onConfirm = () => {
        onClose({
            price: parseInt(price, 10),
            description,
            date,
            id: defaultValues === undefined ? nextId('outcome') : defaultValues.id,
            operation: defaultValues === undefined ? 'add' : 'edit',
            oldPrice: defaultValues?.price || 0,
        });
    };

    const onCancel = () => {
        onClose();
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}>
            {showDateTimePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    onChange={onChange}
                    locale={'tr-TR'}
                />
            )}
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    padding: 10,
                    textAlign: 'center',
                    color: 'white',
                }}>
                {defaultValues === undefined ? 'Gider Ekle' : 'Gider Düzenle'}
            </Text>

            <View>
                <TextInput
                    inputMode={'numeric'}
                    keyboardType={'numeric'}
                    style={{
                        padding: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                    }}
                    value={price}
                    defaultValue={(defaultValues?.price || 0).toString(2)}
                    onChangeText={onChangePrice}
                    placeholder={'Miktar Giriniz'}
                    placeholderTextColor={'white'}
                />
                <TextInput
                    inputMode={'text'}
                    keyboardType={'default'}
                    style={{
                        padding: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                    }}
                    value={description}
                    defaultValue={defaultValues?.description || ''}
                    onChangeText={onChangeDescription}
                    placeholder={'Açıklama Giriniz'}
                    placeholderTextColor={'white'}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 22,
                        paddingHorizontal: 32,
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'white',
                            flex: 1,
                            textAlign: 'center',
                        }}>
                        {localizeDate(date)}
                    </Text>

                    <Button
                        title={'Tarih Seç'}
                        disabled={defaultValues?.date !== undefined}
                        onPress={() => setShowDateTimePicker(true)}
                    />
                </View>
            </View>

            <View
                style={{
                    padding: 20,
                }}>
                <Button
                    title={'Gider ' + (defaultValues === undefined ? 'Ekle' : 'Düzenle')}
                    color={'rgba(57,203,57,0.8)'}
                    onPress={onConfirm}
                />
            </View>
            <View
                style={{
                    padding: 20,
                }}>
                <Button
                    title="İptal"
                    color={'rgba(203,57,57, 0.8)'}
                    onPress={onCancel}
                />
            </View>
        </View>
    );
}
