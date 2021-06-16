import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../../UI/Card'
import Hr from '../../UI/Hr';
import { SECONDARY, SUCCESS, WARNING, WHITE } from '../../const/Colors';
import { styles } from './styles';

export const CardAttention = () => {
    return (
        <View style={{height: 350, marginBottom: 10}}>
            <Card>
                <View style={styles.cardAttention}>
                    <View style={{flexDirection: 'row', flex: 0.5}}>
                        <View style={{flex: 2}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon name="calendar-account" size={35} color={SECONDARY}/>
                                <Text style={{fontSize: 22, color: SECONDARY, marginLeft: 5}}>Creado el: <Text style={{color: SUCCESS, fontWeight: 'bold'}}>Fecha</Text> </Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                                    <Icon name="account-edit" size={35} color={SECONDARY}/>
                                    <Text style={{fontSize: 18, color: SECONDARY, marginLeft: 5}}>Guiseppe Epifani - 19869835-0</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                            <Button
                                icon={
                                    <Icon
                                    name="delete"
                                    size={25}
                                    color="white"
                                    />
                                }
                                containerStyle={{marginRight: 2}}
                                buttonStyle={styles.btnDelete}
                            /> 
                            <Button
                                icon={
                                    <Icon
                                    name="clipboard-plus"
                                    size={25}
                                    color="white"
                                    />
                                }
                                buttonStyle={styles.btnInfo}
                                titleStyle={{fontWeight: 'bold', marginLeft: 5}}
                                title="Ver ficha"
                            />
                        </View>
                    </View>
                    <Hr/>
                    <View style={{flex: 1.4, padding: 2, marginTop: 5}}>
                        <View style={styles.containerBackground}>
                            <View style={{height: 40, backgroundColor: SECONDARY}}>
                                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
                                    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                                        <Icon name="note-text" size={30} color={WHITE} style={{marginLeft: 5}}/>
                                        <Text style={{fontSize: 18, color: WHITE, marginLeft: 5}}>REGISTRO ANTECEDENTES</Text>
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center'}}>
                                        <Icon name="file-document-edit" size={30} color={WHITE} style={{marginRight: 5, alignSelf: 'flex-end'}}/>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <Text style={styles.textBackgroundSuccess}>ANTECEDENTES</Text>
                                    <Icon name="checkbox-marked-circle-outline" size={30} color={SUCCESS} style={{ marginLeft: 5}}/>
                                </View>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <Text style={styles.textBackgroundWarning}>CONTROL DE SALUD</Text>
                                    <Icon name="circle-off-outline" size={30} color={WARNING} style={{marginLeft: 5}}/>
                                </View>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <Text style={styles.textBackgroundWarning}>ENTREVISTA CLÍNICA</Text>
                                    <Icon name="circle-off-outline" size={30} color={WARNING} style={{marginLeft: 5}}/>
                                </View>

                            </View>
                        </View>
                        <View style={{flex: 0.1}}/>
                        <View style={{flex: 1.3, borderWidth: 1, borderColor: SECONDARY, borderRadius: 10, overflow: 'hidden'}}>
                            <View style={{height: 40, backgroundColor: SECONDARY}}>
                            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>

                                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                                    <Icon name="clock" size={30} color={WHITE} style={{marginLeft: 5}}/>
                                    <Text style={{fontSize: 18, color: WHITE, marginLeft: 5}}>CIERRE ATENCIÓN</Text>
                                </View>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Icon name="file-document-edit" size={30} color={WHITE} style={{marginRight: 5, alignSelf: 'flex-end'}}/>
                                </View>
                                </View>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name="checkbox-marked-circle-outline" size={30} color={SUCCESS} style={{marginLeft: 5}}/>
                                    <Text style={styles.textBackgroundSuccess}>Cerrado - fecha</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    )
}