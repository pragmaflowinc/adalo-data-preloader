import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import AdaloStoreComponent from './adaloStoreComponent'

const AdaloPreloader = (props) => {
	const { editor } = props
	return(
		<View style={{ height: editor ? props._height : 0, width: editor ? props._width : 0,  }}>
			{
				editor ?
				<Text>Pre-loader installed</Text>
				:
				<AdaloStoreComponent {...props} />
			}
		</View>
	)
}
export default AdaloPreloader
