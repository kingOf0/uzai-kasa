import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {localizeDate, nextId} from '../../utils/Utils';

export function IncomeAddModal({onClose, editValues}) {
    const [price, onChangePrice] = useState(
        editValues?.price?.toString() || '',
    );
    const [description, onChangeDescription] = useState(
        editValues?.description || '',
    );

    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [date, setDate] = useState(editValues?.date || new Date());

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
            id: editValues === undefined ? nextId('income') : editValues.id,
            operation: editValues === undefined ? 'add' : 'edit',
            oldPrice: editValues?.price || 0,
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
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    padding: 10,
                    textAlign: 'center',
                    color: 'white',
                }}>
                {editValues === undefined ? 'Gelir Ekle' : 'Gelir Düzenle'}
            </Text>

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
                    defaultValue={(editValues?.price || 0).toString(2)}
                    onChangeText={onChangePrice}
                    placeholderTextColor={'white'}
                    placeholder={'Miktar Giriniz'}
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
                    defaultValue={editValues?.description || ''}
                    onChangeText={onChangeDescription}
                    placeholderTextColor={'white'}
                    placeholder={'Açıklama Giriniz'}
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
                        disabled={editValues?.date !== undefined}
                        onPress={() => setShowDateTimePicker(true)}
                    />
                </View>
            </View>

            <View
                style={{
                    padding: 20,
                }}>
                <Button
                    title={'Gelir ' + (editValues === undefined ? 'Ekle' : 'Düzenle')}
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
