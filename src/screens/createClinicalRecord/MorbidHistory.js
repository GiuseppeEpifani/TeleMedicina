import React, { useState, useContext, useEffect } from 'react'
import { View, Text, ScrollView, ActivityIndicator} from 'react-native'
import { Badge, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CardInfoPatient } from '../../components/infoPatient/CardInfoPatient';
import { ALLERGIES } from '../../const/Allergies';
import { LIGHT, PRIMARY, SUCCESS, VERY_LIGHT, WHITE } from '../../const/Colors'
import { FIELD_COMPLETE, MIN_FIELD_2 } from '../../const/Fields';
import { PATHOLOGIES } from '../../const/Pathologies';
import { HomeContext } from '../../context/Home/HomeContext';
import { RecordContext } from '../../context/RecordFile/RecordContext';
import Card from '../../UI/Card';
import DatePicker from '../../UI/DatePicker';
import Hr from '../../UI/Hr';
import InputText from '../../UI/InputText';
import KeyboardScrollView from '../../UI/KeyboardScrollView';
import PickerMultiSelect from '../../UI/PickerMultiSelect';
import SwitchContainer from '../../UI/SwitchContainer';

export const MorbidHistory = ({navigation}) => {

    const { patient } = useContext(HomeContext);
    const { updatedRecordMorbidAntecedent, currentRecord, cleanImageFallsAndBumps } = useContext(RecordContext);

    const [loading, setLoading] = useState(false);
    const [loadingInit, setLoadingInit] = useState(true)
    const [validated, setValidated] = useState(false);
    const [isAllergies, setIsAllergies] = useState((!Array.isArray(currentRecord.morbid_antecedent) && currentRecord.morbid_antecedent.allergies) ? currentRecord.morbid_antecedent.allergies : false);
    const [homeOxygen, setHomeOxygen] = useState((!Array.isArray(currentRecord.morbid_antecedent) && currentRecord.morbid_antecedent.home_oxygen) ? currentRecord.morbid_antecedent.home_oxygen : false);
    const [postrate, setPostrate] = useState((!Array.isArray(currentRecord.morbid_antecedent) && currentRecord.morbid_antecedent.prostrate) ? currentRecord.morbid_antecedent.prostrate : false);
    const [lastRuleDate, setLastRuleDate] = useState(!Array.isArray(currentRecord.morbid_antecedent) && currentRecord.morbid_antecedent.last_rule_date ? currentRecord.morbid_antecedent.last_rule_date.substr(0, 10) : null);
    const [previousPregnancies, setPreviousPregnancies] = useState((!Array.isArray(currentRecord.morbid_antecedent) && currentRecord.morbid_antecedent.previous_pregnancies) ? currentRecord.morbid_antecedent.previous_pregnancies : null);
    const [abortion, setAbortion] = useState((!Array.isArray(currentRecord.morbid_antecedent) && currentRecord.morbid_antecedent.abortion) ? currentRecord.morbid_antecedent.abortion : null);
    const [drugs, setDrugs] = useState((!Array.isArray(currentRecord.morbid_antecedent) && currentRecord.morbid_antecedent.drugs) ? currentRecord.morbid_antecedent.drugs : null);
    const [other, setOther] = useState((!Array.isArray(currentRecord.morbid_antecedent) && currentRecord.morbid_antecedent.other) ? currentRecord.morbid_antecedent.other : null);
    const [pathologiesSelected, setPathologiesSelected] = useState([]);
    const [pathologies, setPathologies] = useState(PATHOLOGIES);
    const [allergiesSelected, setAllergiesSelected] = useState([]);
    const [allergies, setAllergies] = useState(ALLERGIES);

    useEffect(() => {

        cleanImageFallsAndBumps();

        if ((!Array.isArray(currentRecord.morbid_antecedent) && currentRecord.morbid_antecedent.pathology.length > 0)) {
            const pathologiesFormated = currentRecord.morbid_antecedent.pathology.map(item => JSON.stringify(item));+
            setPathologiesSelected(pathologiesFormated);
        }

        if ((!Array.isArray(currentRecord.morbid_antecedent) && currentRecord.morbid_antecedent.allergies_array.length > 0)) {
            const allergiesFormated = currentRecord.morbid_antecedent.allergies_array.map(item => JSON.stringify(item));
            setAllergiesSelected(allergiesFormated);
        }

        setLoadingInit(false);
    }, []);

    const handleGetDate = (dateString) => {
        setLastRuleDate(dateString);
    }

    const saveRecord = async () => {
        setValidated(true);
        if (other && other.trim().length < 2) {
            return;
        }

        if (drugs && drugs.trim().length < 2) {
            return;
        }

        if (pathologiesSelected.length > 0) {
            setLoading(true);
            let pathologyFormated = pathologiesSelected.map(value => JSON.parse(value));
            let allergiesFormated = [];
            if (allergiesSelected.length > 0) {
                allergiesFormated = allergiesSelected.map(value => JSON.parse(value));
            }

            let morbid_antecedent = 
                { 
                    pathology: pathologyFormated, 
                    other: other,
                    drugs: drugs,
                    prostrate: postrate,
                    home_oxygen: homeOxygen,
                    allergies: isAllergies, 
                    allergies_array: allergiesFormated,
                    last_rule_date: (lastRuleDate) ? `${lastRuleDate} 00:00:00` : null,
                    previous_pregnancies: previousPregnancies, 
                    abortion: abortion
                };
            await updatedRecordMorbidAntecedent({patientId: patient._id, morbid_antecedent, rbd: patient.rbd})
            navigation.navigate('HealthCheck');
            setValidated(false);
            setLoading(false);
        }
    }
 
    return (
        <KeyboardScrollView scrollEnabled={false} extraHeight={50} barColor={PRIMARY} backgroundColor={WHITE}>
            <View style={{flex: 1}}>
                <View style={{height: 26, width: '100%', flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', width: '33.33%', backgroundColor: SUCCESS}}>
                        <Badge value="1" badgeStyle={{backgroundColor: WHITE}} textStyle={{color: PRIMARY}} />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', width: '33.33%', backgroundColor: VERY_LIGHT}}>
                        <Badge value="2" badgeStyle={{backgroundColor: PRIMARY}} textStyle={{color: WHITE}} />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', width: '33.33%', backgroundColor: VERY_LIGHT}}>
                        <Badge value="3" badgeStyle={{backgroundColor: PRIMARY}} textStyle={{color: WHITE}} />
                    </View>
                </View>
                <View style={{flex: 0.3, paddingHorizontal: 30, paddingBottom: 10}}>
                    <View style={{position: 'absolute', right: 30, marginTop: 5, height: 50, zIndex: 10 }}>
                        <Button title="Volver" buttonStyle={{height: 40, width: 120, backgroundColor: PRIMARY, borderRadius: 20, zIndex: 10}} titleStyle={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}} 
                            icon={
                                <Icon
                                    name="clipboard-arrow-left"
                                    size={22}
                                    color="white"
                                />
                            }
                            onPress={() => {navigation.navigate('InfoPatient')}}
                        />
                    </View>
                    <CardInfoPatient patient={patient} />
                </View>
                <View  style={{flex: 0.05}} />
                    <View style={{flex: 1, paddingHorizontal: 30, marginTop: 10}}>
                        <Card padding={10}>
                        {
                            (loadingInit) &&
                            <View style={{height: '100%', justifyContent: 'center', alignContent: 'center'}}> 
                                <ActivityIndicator size="large" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent'}} />
                            </View>
                        }
                        {
                            (!loadingInit) && 
                            <ScrollView>
                                <PickerMultiSelect value={pathologiesSelected} setValue={setPathologiesSelected} items={pathologies} setItems={setPathologies} max={PATHOLOGIES.length} label={'Patolog??a'} labelError={(pathologiesSelected.length === 0 && validated) ? FIELD_COMPLETE : false} />
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <InputText 
                                            label={'Otro'}
                                            labelError={(other && other.trim().length < 2) ? MIN_FIELD_2 : false}
                                            onChangeText={setOther}
                                            value={other}
                                            placeholder={' '} 
                                            keyboardType={'default'} 
                                        />
                                    </View>
                                    <View style={{flex:0.050}}/>
                                    <View style={{flex: 1}}>
                                        <InputText 
                                            label={'F??rmaco'}
                                            labelError={(drugs && drugs.trim().length < 2) ? MIN_FIELD_2 : false}
                                            onChangeText={setDrugs}
                                            value={drugs}
                                            placeholder={' '} 
                                            keyboardType={'default'} 
                                        />
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <SwitchContainer value={postrate} label={'Postrado'} onValueChange={setPostrate} />
                                    </View>
                                    <View style={{flex: 1}}>
                                        <SwitchContainer value={homeOxygen} label={'Ox??geno domiciliario'} onValueChange={setHomeOxygen} />
                                    </View>
                                    <View style={{flex: 1}}>
                                        <SwitchContainer value={isAllergies} label={'Alerg??as'} onValueChange={setIsAllergies} />
                                    </View>
                                </View>
                                {
                                    (isAllergies) &&
                                    <PickerMultiSelect value={allergiesSelected} setValue={setAllergiesSelected} items={allergies} setItems={setAllergies} max={ALLERGIES.length} label={'Tipo de alergia'}/>
                                }
                                <Hr/>
                                <Text style={{alignSelf: 'center', marginVertical: 10, fontSize: 26, fontWeight: 'bold', color: LIGHT}}>En caso de embarazo</Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <DatePicker handleGetDate={handleGetDate} labelError={false} value={lastRuleDate} label={'Fecha de la ??ltima regla'}/>         
                                    </View>
                                    <View style={{flex:0.050}}/>
                                    <View style={{flex: 1}}>
                                        <InputText 
                                            label={'Embarazos anteriores'}
                                            labelError={false}
                                            onChangeText={setPreviousPregnancies}
                                            value={previousPregnancies}
                                            placeholder={' '} 
                                            keyboardType={'numeric'} 
                                        />
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <InputText 
                                            label={'Aborto'}
                                            labelError={false}
                                            onChangeText={setAbortion}
                                            value={abortion}
                                            placeholder={' '} 
                                            keyboardType={'numeric'} 
                                        />
                                    </View>
                                    <View style={{flex: 1}}/>
                                </View>
                            </ScrollView>
                        }
                        </Card>
                    </View>
                <View style={{flex: 0.05}}/>
                <View style={{height: 80, marginBottom: 70}}>
                    <Button title="Siguiente" buttonStyle={{height: 70, backgroundColor: PRIMARY}} titleStyle={{fontSize: 32, fontWeight: 'bold', marginLeft: 10}} 
                        icon={
                            <Icon
                                name="menu-right"
                                size={56}
                                color="white"
                            />
                        }
                        iconRight
                        onPress={saveRecord}
                        loading={loading}
                        disabled={loading}
                    />
                </View>
            </View>
        </KeyboardScrollView>
    )
}