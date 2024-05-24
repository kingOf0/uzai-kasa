import {StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import {Income} from './sections/income/Income';
import {Outcome} from './sections/outcome/Outcome';
import {Report} from './sections/report/Report';
import {MMKV} from 'react-native-mmkv';
import {useKeepAwake} from '@sayem314/y';

export const storage = new MMKV();

export default function App() {
    const [selectedView, setSelectedView] = useState('income');

    useKeepAwake();

    if (false) {
        storage.delete('income-2024');
        storage.delete('outcome-2024-2');
        storage.delete('money');
    }

    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                padding: 10,
                textAlign: 'center',
                color: 'white',
            }}>Uzai Kasa</Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: '#e0e0e0',
                    elevation: 3,
                }}>
                <View
                    style={{
                        backgroundColor:
                            selectedView === 'income'
                                ? '#8e8b8b'
                                : 'transparent',
                        padding: 20,
                        flex: 1,
                        alignItems: 'center',
                    }}
                    onTouchEnd={() => setSelectedView('income')}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'white',
                        }}>
                        Gelir
                    </Text>
                </View>
                <View
                    style={{
                        backgroundColor:
                            selectedView === 'outcome'
                                ? '#8e8b8b'
                                : 'transparent',
                        padding: 20,
                        flex: 1,
                        alignItems: 'center',
                    }}
                    onTouchEnd={() => setSelectedView('outcome')}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'white',
                        }}>
                        Gider
                    </Text>
                </View>
                <View
                    style={{
                        backgroundColor:
                            selectedView === 'report'
                                ? '#8e8b8b'
                                : 'transparent',
                        padding: 20,
                        flex: 1,
                        alignItems: 'center',
                    }}
                    onTouchEnd={() => setSelectedView('report')}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'white',
                        }}>
                        Rapor
                    </Text>
                </View>
            </View>

            {selectedView === 'income' && <Income />}
            {selectedView === 'outcome' && <Outcome />}
            {selectedView === 'report' && <Report />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#393939',
        flex: 1,
    },
});
