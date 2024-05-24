import {Button, Pressable, ScrollView, Text, View} from 'react-native';
import {storage} from '../../App';
import React, {useCallback, useState} from 'react';
import {currencyFormat, localizeDate} from '../../utils/Utils';
import MonthPicker from 'react-native-month-year-picker';

function loadData(date) {
    const rawData =
        storage.getString(
            'outcome-' + date.getFullYear() + '-' + date.getMonth(),
        ) || '[]';
    return JSON.parse(rawData);
}

export function OutcomeListModal({showModal}) {
    const [date, setDate] = useState(new Date());
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const showPicker = useCallback(value => setShowMonthPicker(value), []);
    const onValueChange = useCallback(
        (event, newDate) => {
            const selectedDate = newDate || date;

            showPicker(false);
            setDate(selectedDate);
        },
        [date, showPicker],
    );

    const [data, setData] = useState(loadData(date));

    return (
        <View
            style={{
                flex: 1,
            }}>
            <Text
                style={{
                    fontSize: 20,
                    padding: 10,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white',
                }}>
                Aylık Gider Geçmişi
            </Text>
            <View>
                <Pressable
                    style={{
                        padding: 10,
                        borderRadius: 3,
                        elevation: 3,
                    }}
                    onPress={() => {
                        showPicker(true);
                    }}>
                    <Text
                        style={{
                            color: 'white',
                        }}>
                        Tarih
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 18,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: 'white',
                            }}>
                            {localizeDate(date, {
                                month: 'long',
                                year: 'numeric',
                            })}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: 'rgba(255, 255, 255, 0.8)',
                            }}>
                            {' '}
                            ▼{' '}
                        </Text>
                    </View>
                </Pressable>
                {showMonthPicker && (
                    <MonthPicker
                        onChange={onValueChange}
                        value={date}
                        minimumDate={new Date(2000, 0)}
                        maximumDate={new Date(2025, 5)}
                        locale="tr"
                    />
                )}
            </View>

            <ScrollView>
                {data.map((item, index) => {
                    return (
                        <Pressable
                            key={index}
                            onPress={() => {
                                showModal(item);
                            }}
                            style={{
                                justifyContent: 'space-between',
                                padding: 10,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 10,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        fontWeight: '500',
                                        color: 'white',
                                    }}>
                                    {currencyFormat(item.price)}₺
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 17,
                                        fontWeight: '500',
                                        color: 'white',
                                    }}>
                                    {localizeDate(item.date)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 10,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        fontWeight: '400',
                                        flex: 1,
                                        color: 'white',
                                    }}>
                                    {item.description}
                                </Text>
                            </View>
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'gray',
                                    paddingTop: 20,
                                }}
                            />
                        </Pressable>
                    );
                })}
            </ScrollView>
            <View
                style={{
                    padding: 20,
                }}>
                <Button
                    title={'Yeni Harcama Ekle'}
                    onPress={() => showModal()}
                />
            </View>
        </View>
    );
}
