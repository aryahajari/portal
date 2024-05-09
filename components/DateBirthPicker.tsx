import React, { useState } from "react";
import { Pressable, View, Text } from "react-native";
import { styled } from "nativewind";
const $View = styled(View);
const $Pressable = styled(Pressable);
const $Text = styled(Text);

import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateBirthPicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date>();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };
  return (
    <$View className="mt-2 mb-2">
      {date === undefined ? null : <$Text className="text-white">Date of Birth</$Text>}
      <$Pressable
        onPress={showDatePicker}
        className="bg-white text-black border-2 border-primary p-2 rounded-md"
      >
        {date !== undefined ? <$Text className="self-center">{date.toDateString()}</$Text> : <$Text className="self-start text-slate-400">Date Of Birth</$Text>}
      </$Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </$View>
  );
};

export default DateBirthPicker;