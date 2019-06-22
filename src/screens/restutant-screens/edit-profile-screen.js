import { connect } from 'react-redux';
import React, { Component } from 'react';
import Toast from 'react-native-easy-toast';
import { change } from 'redux-form/immutable';
import { View, StatusBar, ActivityIndicator } from 'react-native';

import { Header } from '../../components/common/header';
import ProfileForm from '../forms/restaurant-profile-form';

import * as actions from '../../actions/restaurant-actions/profile-actions';
import * as selectors from '../../selectors/restaurant-selectors/profile-selectors';

class EditProfileScreen extends Component {

    state = { profile: '' }

    componentDidMount () {
        this.props.fetchDetails();
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.profile && nextProps.profile.name) {
            this.setState({ profile: nextProps.profile });
        }
    }

    showToaster = message => {
        this.refs.toast.show(message, 2000);
    }

    render () {
        const { loading } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'Restaurant Detail'}
                />
                {loading ?
                    <ActivityIndicator
                        size={'large'}
                        color={'#1BA2FC'}
                    /> : <ProfileForm
                        isEdit={true}
                        change={this.props.change}
                        profile={this.state.profile}
                        showToaster={this.showToaster}
                        navigation={this.props.navigation}
                        onSubmitForm={this.props.onSubmit}
                    />
                }
                <Toast ref="toast" />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    loading: selectors.makeSelectProfileLoading()(state),
    profile: selectors.makeSelectProflieData()(state),
});

const mapDispatchToProps = dispatch => {
    return {
        fetchDetails: () => dispatch(actions.updateProfileAction()),
        change: (fieldName, value) => {
            dispatch(change("RestaurantProfileForm", fieldName, value))
        },
        onSubmit: values => dispatch(actions.updateProfileAction(values)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfileScreen) 