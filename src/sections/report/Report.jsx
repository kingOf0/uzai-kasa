import {Button, Text, View} from 'react-native';
import React, {useState} from 'react';
import {storage} from '../../App';
import {currencyFormat} from '../../utils/Utils';

export function Report() {
    const [money, setMoney] = useState(storage.getNumber('money') || 0);

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
                Güncel Kasa Durumu
            </Text>
            <View
                style={{
                    padding: 10,
                    borderRadius: 3,
                    elevation: 3,
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        padding: 10,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'white',
                    }}>
                    {currencyFormat(money)}₺
                </Text>
            </View>

            <View style={{
                flex: 1,
                gap: 10,
                padding: 10,
                display: "none"
            }}>

                <Button title={"Yıllık Gelir Raporu"} onPress={() => {
                }} />
                <Button title={"Aylık Gider Raporu"} onPress={() => {}} />
            </View>

        </View>
    );
}
