import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';

import CategoryForm from '../forms/category-form';
import { PageHeader } from '../../components/common/header';

class CategoryScreen extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} />
                <PageHeader
                    navigation={this.props.navigation}
                    title={'Add Category'}
                />
                <View style={{ flex: 1 }}>
                    <CategoryForm
                        navigation={this.props.navigation}
                        imageUrl={params ? params.imageUrl : null}
                        catId={params ? params.catId : null}
                    />
                </View>
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
