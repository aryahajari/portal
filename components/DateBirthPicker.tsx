import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/assets/styles/reactDatePicker.css';
//------------------------------------------------------------------------------------------
import { Pressable, View, Text, Platform } from "react-native";
import { styled } from "nativewind";
const $View = styled(View);
const $Pressable = styled(Pressable);
const $Text = styled(Text);
//------------------------------------------------------------------------------------------
import { doc, setDoc, DocumentReference } from "firebase/firestore";
import { firebaseFirestore } from '@/FirebaseConfig';
import { useUserData } from '@/context/UserDataProvider'
//------------------------------------------------------------------------------------------
const DateBirthPicker = () => {
  const userData = useUserData();
  let userDbRef: DocumentReference;
  useEffect(() => {
    if (userData !== null && userData.dateOfBirth) setDate(new Date(userData.dateOfBirth))
  }, [userData]);

  function saveDOB(date: Date) {
    if (userData === null) return;
    const userDbRef = doc(firebaseFirestore, 'users', userData?.uid)
    setDoc(userDbRef, { dateOfBirth: date.toDateString() }, { merge: true })
      .catch((error) => { console.log("Error updating document: ", error); });
  }
  //------------------------------------------------------------------------------------------


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date>();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    //setDate(date);
    saveDOB(date);
    hideDatePicker();
  };
  if (Platform.OS === 'web') {
    return (
      <$View className="mt-2 mb-2 flex-1 ">
        {date === undefined ? null : <$Text className="text-white">Date of Birth</$Text>}
        <DatePicker
          onChange={saveDOB}
          selected={date}
          placeholderText="Date of Birth"
          showYearDropdown={true}
          showMonthDropdown={true}
        />
      </$View>
    );
  } else {
    return (
      <$View className="mt-2 mb-2">
        {date === undefined ? null : <$Text className="text-white">Date of Birth</$Text>}
        <$Pressable
          onPress={showDatePicker}
          className="bg-white text-black border-2 border-primary p-2 rounded-md"
        >
          {date !== undefined ? <$Text className="self-center">{date.toDateString()}</$Text> : <$Text className="self-start text-slate-400">Date of Birth</$Text>}
        </$Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </$View>
    );
  }
};

export default DateBirthPicker;