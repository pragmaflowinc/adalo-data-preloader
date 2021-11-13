import React, { useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { getDependencies } from '@protonapp/proton-runner/lib/utils/dependencies'
import { getFormInputs } from '@protonapp/proton-runner/lib/ducks/formInputs'
import { tokens } from '@protonapp/proton-runner/lib/ducks/auth'
import { fetch as duckFetch } from '@protonapp/proton-runner/lib/ducks/data'
import { useApp } from './useApp'

const AdaloStoreComponent = (props) => {
	const { app, unsafeGetToken} = useApp()
	const { state, formInputs, stateTokens } = props

	const fetchAppData = () => {
		const datasources = (app && app.datasources) || {}
		// Object.keys(state.auth.tokens).map(tokenKey => {
		// 	tokens[tokenKey] = state.auth.tokens[tokenKey]
		// })
		Object.keys(app.components).forEach((component) => {

			const dependencies = getDependencies(app.components[component], {
				formInputs,
				getDatasources: () => (app && app.datasources) || {},
				getApp: () => app,
				state,
				getParams: () => ({})
			})
			dependencies.forEach(dep => {
				if (dep.fetchFirst) {
					return props.fetch('https://database-red.adalo.com', {
						...dep,
						datasource: datasources[dep.datasourceId],
						componentId: component,
						bindingIds: Object.keys(app.components[component].dataBindings),
						state,
						getParams: () => ({})
					}) 
				}
			})

			dependencies.map(dep => {
				return props.fetch('https://database-red.adalo.com', {
						...dep,
						datasource: datasources[dep.datasourceId],
						componentId: component,
						bindingIds: Object.keys(app.components[component].dataBindings),
						state,
						getParams: () => ({

						})
					})
			})
		})
	}

	useEffect(() => {
		if (app && stateTokens && formInputs) {
			fetchAppData()
		}
	}, [app, stateTokens, formInputs])

	return(
		<View></View>
	)
}

const mapStateToProps = (state) => ({ 
	state,
	stateTokens: state?.auth?.tokens,
	formInputs: getFormInputs(state) 
})
export default connect(mapStateToProps, { fetch: duckFetch })(AdaloStoreComponent)
