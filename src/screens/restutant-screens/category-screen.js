import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';

import CategoryForm from '../forms/category-form';
import { PageHeader } from '../../components/common/header';

class CategoryScreen extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} />
                <PageHeader
                    navigation={this.props.navigation}
                    title={'Add Category'}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <CategoryForm navigation={this.props.navigation} />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default CategoryScreen
