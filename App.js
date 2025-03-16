import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button, FlatList, StyleSheet, TextInput } from 'react-native';
import TodoScreen from './TodoScreen';
import AppointmentLogic from './AppointmentLogic';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Tab = createBottomTabNavigator();

const AppointmentScreen = () => {
    const {
        appointments,
        date,
        isDatePickerVisible,
        handleConfirm,
        showDatePicker,
        appointmentText,
        setAppointmentText,
        editAppointment,
        deleteAppointment,
    } = AppointmentLogic();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lịch Hẹn</Text>
            <TextInput
                style={styles.input}
                value={appointmentText}
                onChangeText={setAppointmentText}
                placeholder="Nhập nội dung lịch hẹn"
            />
            <Button title="Chọn Ngày/ Giờ" onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                date={date}
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
            />
            <Text style={styles.dateText}>Ngày/ Giờ đã chọn: {date.toLocaleString()}</Text>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.appointmentItem}>
                        <Text>{item.date.toLocaleString()}: {item.text}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Sửa" onPress={() => editAppointment(item)} />
                            <Button title="Xóa" onPress={() => deleteAppointment(item.id)} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Quản Lý Công Việc" component={TodoScreen} />
                <Tab.Screen name="Lịch Hẹn" component={AppointmentScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    dateText: {
        marginTop: 20,
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '100%',
        padding: 10,
    },
    appointmentItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9c2ff',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
