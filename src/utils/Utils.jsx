import {ToastAndroid, Platform, AlertIOS} from 'react-native';
import {storage} from '../App';

export function showToast(msg) {
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
        AlertIOS.alert(msg);
    }
}

export function localizeDate(
    date,
    options = {year: 'numeric', month: 'long', day: 'numeric'},
) {
    return new Date(date).toLocaleDateString('tr-TR', options);
}

export function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function nextId(type) {
    const value = (storage.getNumber('id-' + type) || 0) + 1;
    storage.set('id-' + type, value);
    return value;
}
