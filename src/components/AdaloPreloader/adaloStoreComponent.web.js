import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { getDependencies } from '@protonapp/proton-runner/lib/utils/dependencies'
import { getFormInputs } from '@protonapp/proton-runner/lib/ducks/formInputs'
import { tokens } from '@protonapp/proton-runner/lib/ducks/auth'
import { fetch as duckFetch } from '@protonapp/proton-runner/lib/ducks/data'

const AdaloStoreComponent = (props) => {
	
	const { state, appId, formInputs, stateTokens } = props
	const [app, setApp] = useState()

	useEffect(() => {
		fetch(`https://adalo.global.ssl.fastly.net/apps/${appId}`, {
			headers: {
				'x-server-auth': 'hplovecraft'
			}
		}).then(res => res.json()).then(data => {
			setApp(data)
		})
	},[])

	const fetchAppData = () => {
		const datasources = (app && app.datasources) || {}
		Object.keys(state.auth.tokens).map(tokenKey => {
			tokens[tokenKey] = state.auth.tokens[tokenKey]
		})
		Object.keys(app.components).forEach((component) => {
			if (component === app.launchComponentId) { return; }
			const dependencies = getDependencies(app.components[component], {
				formInputs,
				getDatasources: () => (app && app.datasources) || {},
				getApp: () => app,
				state,
				getParams: () => ({})
			})
			// I am not sure if there is anything that uses fetchFirst
			// if it turns out there is, I will need to async/await
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

			dependencies.forEach(dep => {
				return props.fetch('https://database-red.adalo.com', {
						...dep,
						datasource: datasources[dep.datasourceId],
						componentId: component,
						bindingIds: Object.keys(app.components[component].dataBindings),
						state,
						getParams: () => ({})
					})
			})
		})
						
	}

	useEffect(() => {
		if (app && stateTokens && formInputs && global.dataPreloaderLoaded === undefined) {
			// prevent component destruction and recreation loop
			global.dataPreloaderLoaded = true
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
