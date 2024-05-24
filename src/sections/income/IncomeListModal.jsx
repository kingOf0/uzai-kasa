import React, {useState} from 'react';
import {Button, Pressable, ScrollView, Text, View} from 'react-native';
import {storage} from '../../App';
import {currencyFormat, localizeDate} from '../../utils/Utils';
import {Picker} from '@react-native-picker/picker';

function loadData(year) {
    const rawData = storage.getString('income-' + year) || [];
    if (rawData.length === 0) {
        return [];
    }
    return JSON.parse(rawData);
}

export function IncomeListModal({showMoneyAddModal}) {
    const currentDate = new Date();
    const [date, setDate] = useState(currentDate.getFullYear());
    const [data, setData] = useState(loadData(date));

    const years = Array.from(
        {length: 5},
        (_, i) => currentDate.getFullYear() + i - 2,
    );

    function onYearChange(date) {
        setDate(date);
        setData(loadData(date));
    }

    return (
        <View
            style={{
                flex: 1,
            }}>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    padding: 10,
                    textAlign: 'center',
                    color: 'white',
                }}>
                Yıllık Gelir Geçmişi
            </Text>
            <View
                style={{
                    padding: 10,
                    borderRadius: 3,
                    elevation: 3,
                }}>
                <Text style={{
                    color: 'white',
                }}>Tarih</Text>
                <Picker
                    style={{
                        elevation: 3,
                        padding: 10,
                        color: 'white',
                    }}
                    selectedValue={date}
                    onValueChange={onYearChange}>
                    {years.map((item, index) => {
                        return (
                            <Picker.Item
                                label={item}
                                value={item}
                                key={index}
                            />
                        );
                    })}
                </Picker>
            </View>

            <ScrollView>
                {data.map((item, index) => {
                    return (
                        <Pressable
                            key={index}
                            onPress={() => {
                                showMoneyAddModal(item);
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
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 20,
                }}>
                <Button title="Para Ekle" onPress={() => showMoneyAddModal()} />
            </View>
        </View>
    );
}
