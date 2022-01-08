import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment/min/moment-with-locales';
import Color from '../utils/color';
// import Styles from '../utility/Style';
import { Calendar } from 'react-native-calendars';
import SimpleModal from './SimpleModal';
import Button from './Button';
import color from '../utils/color';

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            currentTime: new Date(),

            hour: 0,
            minute: 0,
            hourString: '00',
            minuteString: '00',

            display: 'date', //year
        };


    }

    componentDidMount() {
        if (this.props.isPrevious) {
            var d = new Date();
            this.setState({ currentTime: d.setDate(d.getDate() - 1) });
        }
    }

    pad(time) {
        if (time == null) {
            return '00';
        }
        let str = time.toString();
        // console.log("STR", str);
        if (str.length == 1) {
            return '0' + str;
        }
        return str;
    }

    render() {
        let mode = 'date';
        if (this.props.mode) {
            mode = this.props.mode;
        }

        let icon = 'calendar-blank';
        if (mode == 'time') {
            icon = 'clock-outline';
        }

        let currentTime = this.state.currentTime;
        let format = 'YYYY-MM-DD';
        if (this.props.format) {
            format = this.props.format;
        }

        let markedDates = {};
        let currentDate = null;
        let arrayYear = [];
        let currentYear = null;
        let idx = 0;
        if (this.props.value) {
            currentTime = moment(this.props.value, format).toDate();
            currentDate = moment(currentTime).format('YYYY-MM-DD');
            markedDates[currentDate] = { selected: true };

            let firstYear = parseInt(moment().subtract(80, 'year').format('YYYY'));
            let endYear = parseInt(moment().add(2, 'year').format('YYYY'));

            arrayYear = [];
            let _idx = 0;
            currentYear = parseInt(moment(currentTime).format('YYYY'));
            for (let i = firstYear; i < endYear; i++) {
                arrayYear.push(i);
                if (currentYear == i) {
                    idx = _idx;
                }
                _idx++;
            }
        }

        let displayFormat = 'dddd, DD MMM YYYY';
        if (this.props.displayFormat) {
            displayFormat = this.props.displayFormat;
        }

        return (
            <View style={[styles.wrapper, this.props.containerStyle]}>
                {this.props.error != '' && this.props.error != null && (
                    <Text style={styles.errorText}>{this.props.error}</Text>
                )}

                {this.props.label != null && (
                    <Text style={styles.label}>
                        {this.props.label}
                    </Text>
                )}

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        this.setState({ show: true });

                        if (mode == 'time') {
                            let hour = parseInt(moment(currentTime).format('HH'));
                            let minute = parseInt(moment(currentTime).format('mm'));
                            this.setState({
                                hour,
                                minute,
                                hourString: this.pad(hour),
                                minuteString: this.pad(minute),
                            });
                        }
                    }}
                    style={styles.box}>

                    <View style={{ flexDirection: 'column', flex: 1 }}>

                        <Text style={styles.text}>
                            {moment(currentTime).lang("id").format(displayFormat)}
                        </Text>
                    </View>
                    <MaterialCommunityIcons
                        name={icon}
                        size={22}
                        color={Color.blackFont}
                    />
                </TouchableOpacity>

                <SimpleModal
                    visible={this.state.show}
                    onRequestClose={() => {
                        this.setState({ show: false });
                    }}>
                    {mode == 'date' && (
                        <>
                            {this.state.display == 'date' && (
                                <>
                                    <View
                                        style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity
                                            style={[styles.yearPickerButton, { backgroundColor: color.primary }]}
                                            onPress={() => {
                                                //switch to year picker
                                                this.setState({ display: 'year' }, () => {
                                                    setTimeout(() => {
                                                        if (this.myScroll) {
                                                            this.myScroll.scrollTo({
                                                                x: 0,
                                                                y: 30 * idx,
                                                                animated: true,
                                                            });
                                                        }
                                                    }, 500);
                                                });
                                            }}>
                                            <MaterialCommunityIcons
                                                name="calendar-search"
                                                size={20}
                                                color={Color.white}
                                            />
                                            <Text style={styles.yearPickerText}>
                                                {moment(currentDate).format('YYYY')}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Calendar
                                        {...this.props}
                                        // current={moment(currentTime).format('YYYY-MM-DD')}
                                        current={currentDate}
                                        markedDates={markedDates}
                                        onDayPress={(day) => {
                                            this.props.onChange(moment(day.timestamp).format(format));
                                            this.setState({ show: false });
                                        }}
                                        // renderHeader={(date) => {
                                        //     return (
                                        //         <TouchableOpacity style={styles.headerWrapper} onPress={() => {

                                        //         }}>
                                        //             <Text style={styles.headerText}>{moment(date).format("MMM YYYY")}</Text>
                                        //         </TouchableOpacity>
                                        //     );
                                        // }}

                                        enableSwipeMonths={true}
                                    />
                                </>
                            )}

                            {this.state.display == 'year' && (
                                // <View style={{ flex: 1 }}>
                                <ScrollView
                                    style={{ height: '80%' }}
                                    ref={(ref) => {
                                        this.myScroll = ref;
                                    }}>
                                    {arrayYear.map((y) => {
                                        return (
                                            <TouchableOpacity
                                                style={
                                                    y == currentYear
                                                        ? [styles.pickerItemYearSelected, { backgroundColor: color.primary }]
                                                        : styles.pickerItemYear
                                                }
                                                onPress={() => {
                                                    let selectedTime =
                                                        y + moment(currentDate).format('-MM-DD');
                                                    this.props.onChange(
                                                        moment(selectedTime).format(format),
                                                    );
                                                    this.setState({ display: 'date' });
                                                }}>
                                                <Text
                                                    style={
                                                        y == currentYear
                                                            ? styles.pickerItemYearSelectedText
                                                            : styles.pickerItemYearText
                                                    }>
                                                    {y}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>
                                // </View>
                            )}
                        </>
                    )}
                    {mode == 'time' && (
                        <TouchableOpacity activeOpacity={1}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 20,
                                }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.chevronButton}
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            if (this.state.hour < 23) {
                                                this.setState({
                                                    hour: this.state.hour + 1,
                                                    hourString: this.pad(this.state.hour + 1),
                                                });
                                            } else {
                                                this.setState({ hour: 0, hourString: '00' });
                                            }
                                        }}>
                                        <MaterialCommunityIcons
                                            name="chevron-up"
                                            size={30}
                                            color={Color.primary}
                                        />
                                    </TouchableOpacity>

                                    <TextInput
                                        style={styles.inputTime}
                                        keyboardType="numeric"
                                        value={this.state.hourString}
                                        onChangeText={(hourString) => {
                                            let num = parseInt(hourString);
                                            if (num > 23) {
                                                hourString = '23';
                                                num = 23;
                                            }
                                            if (num < 0) {
                                                hourString = '00';
                                                num = 0;
                                            }
                                            this.setState({ hourString, hour: num });
                                        }}
                                    />

                                    {/* <Text style={styles.timeString}>{this.pad(this.state.hour)}</Text> */}
                                    <TouchableOpacity
                                        style={styles.chevronButton}
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            if (this.state.hour > 0) {
                                                this.setState({
                                                    hour: this.state.hour - 1,
                                                    hourString: this.pad(this.state.hour - 1),
                                                });
                                            } else {
                                                this.setState({ hour: 23, hourString: '23' });
                                            }
                                        }}>
                                        <MaterialCommunityIcons
                                            name="chevron-down"
                                            size={30}
                                            color={Color.primary}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.timeString}>:</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.chevronButton}
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            if (this.state.minute < 59) {
                                                this.setState({
                                                    minute: this.state.minute + 1,
                                                    minuteString: this.pad(this.state.minute + 1),
                                                });
                                            } else {
                                                this.setState({ minute: 0, minuteString: '00' });
                                            }
                                        }}>
                                        <MaterialCommunityIcons
                                            name="chevron-up"
                                            size={30}
                                            color={Color.primary}
                                        />
                                    </TouchableOpacity>

                                    <TextInput
                                        style={styles.inputTime}
                                        keyboardType="numeric"
                                        value={this.state.minuteString}
                                        onChangeText={(minuteString) => {
                                            let num = parseInt(minuteString);
                                            if (num > 59) {
                                                minuteString = '59';
                                                num = 59;
                                            }
                                            if (num < 0) {
                                                minuteString = '00';
                                                num = 0;
                                            }
                                            this.setState({ minuteString, minute: num });
                                        }}
                                    />

                                    {/* <Text style={styles.timeString}>{this.pad(this.state.minute)}</Text> */}
                                    <TouchableOpacity
                                        style={styles.chevronButton}
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            if (this.state.minute > 0) {
                                                this.setState({
                                                    minute: this.state.minute - 1,
                                                    minuteString: this.pad(this.state.minute - 1),
                                                });
                                            } else {
                                                this.setState({ minute: 59, minuteString: '59' });
                                            }
                                        }}>
                                        <MaterialCommunityIcons
                                            name="chevron-down"
                                            size={30}
                                            color={Color.primary}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Button
                                onPress={() => {
                                    let day =
                                        moment().format('YYYY-MM-DD') +
                                        ' ' +
                                        this.pad(this.state.hour) +
                                        ':' +
                                        this.pad(this.state.minute) +
                                        ':00';
                                    console.log('Day', day);
                                    this.props.onChange(moment(day).format(format));
                                    this.setState({ show: false });
                                }}
                            >
                                SELECT
                            </Button>
                        </TouchableOpacity>
                    )}
                </SimpleModal>
            </View>
        );
    }
}

const styles = {
    wrapper: {
        marginTop: 0
    },
    box: {
        justifyContent: 'flex-start',
        borderColor: "#A5A4A4",
        borderBottomWidth: 1,
        paddingHorizontal: 2,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.white
    },

    label: {
        fontSize: 14,
        color: Color.black,
    },
    text: {
        color: Color.black,
        marginTop: 3
    },
    titleText: {
        color: Color.blackOpacity,
        marginBottom: 5,
    },
    modalRoot: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    modalContent: {
        width: 300,
        padding: 16,
        borderRadius: 5,
        backgroundColor: Color.white,
    },
    errorText: {
        color: Color.danger,
    },
    inputTime: {
        fontSize: 25,
        color: Color.blackFont,
        fontWeight: 'bold',
        borderColor: Color.gray,
        borderWidth: 1,
        borderRadius: 5,
        width: 50,
        textAlign: 'center',
    },
    timeString: {
        fontSize: 25,
        color: Color.blackFont,
        fontWeight: 'bold',
    },
    chevronButton: {
        paddingHorizontal: 16,
    },

    yearPickerButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    yearPickerText: {
        color: Color.white,
        fontSize: 18,
        marginLeft: 5,
    },
    pickerItemYear: {
        backgroundColor: Color.white,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    pickerItemYearSelected: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    pickerItemYearText: {
        fontSize: 18,
    },
    pickerItemYearSelectedText: {
        fontSize: 18,
        color: Color.white,
    },
};
