import React, { Component } from "react";
import { View, Platform, UIManager, ToastAndroid } from "react-native";
import DeviceInfo from "react-native-device-info";
import { FormLabel, FormInput, CheckBox, Button, FormValidationMessage } from "react-native-elements";
import { connect } from "react-redux";
import * as actionCreators from "../../action";
import translate from "../../config/i18n/CustomI18n";
import styles from "./style";

class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Email: "",
            Phone: "",
            countryCode: "",
            lang: "",
            vailded1: false,
            vailded2: false,
            vailded3: false,
            vailded4: false,
            isFocused: false,
            checked: false,
            ButtonActive: true,
            loading: false,
            displayView: 1,
            LoginID: "123456",
            requiredName: false,
            requiredEmail: false,
            requiredPhone: false,
        };
    }

    componentWillMount() {
        this.setState({ countryCode: DeviceInfo.getDeviceCountry() });
        this.setState({ lang: DeviceInfo.getDeviceLocale() });
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    setName = (name) => {
        if (name === '') {
            this.setState({ requiredName: true, vailded1: false })
        }
        else {
            this.setState({ Name: name, requiredName: false, vailded1: true })
        }
    }

    confirmGo = () => {
        alert('goooooooooooooo')
    };
    requestToApi = (method, params) => {
        const API_URL = "https://api-webtrader.ifxdb.com/";
        const args = { method, params };

        return fetch(API_URL, {
            method: "POST",
            body: `rpc=${JSON.stringify(args)}`,
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        });
    };
    _onClickRegister = async () => {
        // console.log('auisydashdklasldkj')
        let finalName = this.state.Name.trim()
        let finalEmail = this.state.Email.trim()
        if (finalName === '') {
            this.setState({ requiredName: true, vailded1: false })
            return;
        }
        else if (finalEmail === '') {
            this.setState({ requiredEmail: true, vailded2: false })
            return;
        }
        else if (finalEmail.length > 0) {
            filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (filter.test(finalEmail)) {
                this.setState({ Email: finalEmail, requiredEmail: false, vailded2: true });
            } else {
                this.setState({ requiredEmail: true, vailded2: false });
                return;
            }
        }
        let finalPhone = this.state.Phone.trim()
        if (finalPhone === '') {
            this.setState({ requiredPhone: true, vailded3: false })
            return;
        }
        else if (finalPhone.length > 0) {
            filter = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            if (filter.test(finalPhone)) {
                this.setState({ Phone: finalPhone, requiredPhone: false, vailded3: true });
            }
            else {
                this.setState({ requiredPhone: true, vailded3: false })
                return;
            }
        }
        if (!this.state.checked) {
            ToastAndroid.show(
                "Please select 'terms and agreement' option",
                ToastAndroid.SHORT,
            );
            this.setState({ vailded4: false })
        }
        else if (this.state.vailded1 === true && this.state.vailded2 === true && this.state.vailded3 === true && this.state.vailded4 === true) {
            this.confirmGo();
        }
        else {
            ToastAndroid.show(
                "Are you sure!",
                ToastAndroid.SHORT,
            );
        }
    };

    render() {
        console.log('##################', this.state.Phone)
        if (this.state.displayView == 1) {
            return (
                <View>
                    <View>
                        <FormLabel labelStyle={{ color: 'black' }}>
                            {translate("name", this.props.Language)}
                        </FormLabel>
                        <FormInput
                            placeholder={translate("namePlaceholder", this.props.Language)}
                            underlineColorAndroid={'#4d4d4d'}
                            onChangeText={Name => this.setName(Name)}
                        />
                        {
                            this.state.requiredName === true &&
                            <FormValidationMessage>{"User name can't be empty"}</FormValidationMessage>
                        }
                    </View>
                    <View>
                        <FormLabel labelStyle={{ color: 'black' }}>
                            {translate("email", this.props.Language)}
                        </FormLabel>
                        <FormInput
                            placeholder={translate("emailPlaceholder", this.props.Language)}
                            underlineColorAndroid={'#4d4d4d'}
                            autoCapitalize='none'
                            value={this.state.Email.replace(/\s/g, '')}
                            onChangeText={(val) => this.setState({ Email: val.replace(/\s/g, '') })}
                        />
                        {
                            this.state.requiredEmail === true &&
                            <FormValidationMessage>{'Please input a valid email'}</FormValidationMessage>
                        }
                    </View>
                    <View>
                        <FormLabel labelStyle={{ color: 'black' }}>
                            {translate("phone", this.props.Language)}
                        </FormLabel>
                        <FormInput
                            placeholder={translate("phonePlaceholder", this.props.Language)}
                            underlineColorAndroid={'#4d4d4d'}
                            keyboardType="numeric"
                            value={this.state.Phone.replace(/\s/g, '')}
                            onChangeText={(val) => this.setState({ Phone: val.replace(/\s/g, '') })}
                        />
                        {
                            this.state.requiredPhone === true &&
                            <FormValidationMessage>{'Please input a valid phone number'}</FormValidationMessage>
                        }
                    </View>
                    <View>
                        <CheckBox
                            title={translate("acceptTermsAndCondition", this.props.Language)}
                            checkedIcon="check-square-o"
                            uncheckedIcon="square-o"
                            checked={this.state.checked}
                            containerStyle={{ backgroundColor: "white", borderColor: "white" }}
                            onPress={() => {
                                if (this.state.checked == false) {
                                    this.setState({ checked: true, vailded4: true });
                                } else {
                                    this.setState({ checked: false, vailded4: false });
                                }
                            }}
                        />
                    </View>
                    <View>
                        <Button
                            title={translate("openRealAccountButton", this.props.Language)}
                            loading={this.state.loading}
                            loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                            buttonStyle={{ backgroundColor: "#152745" }}
                            onPress={() => this._onClickRegister()}
                            fontSize={15}
                            borderRadius={10}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{ paddingTop: 40 }}>
                    <Button
                        title={["Account : ", this.state.LoginID]}
                        loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                        buttonStyle={{ backgroundColor: "red" }}
                        onPress={() => {
                            ToastAndroid.show(
                                "Please check email/phone for account information ",
                                ToastAndroid.SHORT,
                            );
                        }}
                    />
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        Language:
            state.LanguageReducer.localLang != null
                ? state.LanguageReducer.localLang
                : state.LanguageReducer.lang,
    };
}

export default connect(
    mapStateToProps,
    actionCreators,
)(MyForm);