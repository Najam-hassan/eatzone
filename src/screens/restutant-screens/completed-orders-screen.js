import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StatusBar, ActivityIndicator } from 'react-native';

import { Header } from '../../components/common/header';

import * as actions from '../../actions/restaurant-actions/order-listing-actions';
import * as selectors from '../../selectors/restaurant-selectors/order-list-selectors';

import OrdersContainer from '../../containers/restaurant-containers/my-orders-container';

class CompletedOrdersScreen extends Component {

    componentDidMount () {
        this.props.fetchList();
    }

    render () {
        const { loading, deliveries } = this.props;
        if (loading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#e4e4e4' }}>
                    <StatusBar hidden={false} />
                    <Header
                        navigation={this.props.navigation}
                        title={'Recent Orders'}
                    />
                    <ActivityIndicator size={'large'} color={'#1BA2FC'} />
                </View>
            )
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#e4e4e4' }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'Completed Orders'}
                />
                <NavigationEvents
                    onWillFocus={payload => {
                        console.log('will focus', payload)
                        this.props.fetchList();
                    }}
                />
                <OrdersContainer
                    isCollecting={true}
                    navigation={this.props.navigation}
                    list={deliveries && deliveries.filter(row => row.orderStatus === 'COMPLETED')}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    deliveries: selectors.makeSelectDeliveryOrderList()(state),
    loading: selectors.makeSelectOrderListLoading()(state),
    error: selectors.makeSelectOrderListError()(state),
});

const mapDispatchToProps = dispatch => {
    return {
        fetchList: () => dispatch(actions.fetchOrdersAction()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompletedOrdersScreen); 