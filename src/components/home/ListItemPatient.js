import React from 'react';
import {  TouchableOpacity } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, WHITE } from '../../const/Colors';
import { styles } from './style';

const ListItemPatient = ({patientRender, handleSelectPatient, isSelected}) => {
    console.log('render list')

    return (
        <TouchableOpacity onPress={() => {handleSelectPatient(patientRender)}} key={patientRender._id}>	
            <ListItem key={patientRender._id} bottomDivider containerStyle={ (isSelected) && { backgroundColor: PRIMARY} }>
                <Avatar 
                    key={patientRender._id}
                    rounded
                    title={patientRender.name.charAt(0)}
                    size="medium"
                    containerStyle={{
                        backgroundColor: "silver",
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title style={ (isSelected) && styles.textSelectList || {fontSize: 12} }>{patientRender.name} {patientRender.lastname}</ListItem.Title>
                    <ListItem.Subtitle style={ (isSelected) && styles.textSelectList || {fontSize: 12}}>{patientRender.rbd}</ListItem.Subtitle>
                </ListItem.Content>
                { (isSelected) && <MaterialCommunityIcons name="chevron-right" color={WHITE} size={35} style={{ position: 'absolute', right: 0 }}/> }
            </ListItem>
        </TouchableOpacity>
    )
};

const areEqual = (prevProps, nextProps) => {
    const { isSelected } = nextProps;
    const { isSelected: prevIsSelected } = prevProps;   
    const isSelectedEqual = isSelected === prevIsSelected;
    return isSelectedEqual;
};

export default  React.memo(ListItemPatient, areEqual);


  
