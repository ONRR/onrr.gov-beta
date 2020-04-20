import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import utils from '../../../../js/utils'
import { StoreContext } from '../../../../store'

import CircleChart from '../../../data-viz/CircleChart/CircleChart'
import { ExploreDataLink } from '../../../layouts/IconLinks/ExploreDataLink'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Box
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }
}))

const APOLLO_QUERY = gql`
  query RevenueTypes($state: String!, $year: Int!) {
    revenue_type_summary(
      where: { fiscal_year: { _eq: $year }, state_or_area: { _eq: $state } }
      order_by: { fiscal_year: asc, total: desc }
    ) {
      fiscal_year
      revenue_type
      state_or_area
      total
    }
  }
`

const RevenueDetailTypes = props => {

  const classes = useStyles()
  const theme = useTheme()
  const { state } = useContext(StoreContext)
  const year = state.year

  const dataSet = `FY ${ year }`

  const stateAbbr = ((props.abbr.length > 2) &&
    (props.abbr !== 'Nationwide Federal' || props.abbr !== 'Native American')) ? props.abbr : props.state

  const { loading, error, data } = useQuery(APOLLO_QUERY, {
    variables: { state: stateAbbr, year: year }
  })

  let chartData

  if (loading) return ''

  if (error) return `Error! ${ error.message }`

  if (data) {
    chartData = data
  }

  return (
    <>
      { chartData.revenue_type_summary.length > 0
        ? (
          <Box className={classes.root}>
            <Box component="h4" fontWeight="bold">Revenue types</Box>
            <Box>
              <CircleChart data={chartData.revenue_type_summary} xAxis='revenue_type' yAxis='total'
                format={ d => utils.formatToDollarInt(d) }
                yLabel={dataSet}
                maxCircles={4}
                maxColor={theme.palette.orange[600]}
                minColor={theme.palette.orange[100]} />
              <Box mt={3}>
                <ExploreDataLink to="/query-data/?dataType=Revenue" icon="filter">
                    Query revenue by type
                </ExploreDataLink>
              </Box>
            </Box>
          </Box>
        )
        : (
          <Box className={classes.boxSection}>
            <Box component="h4" fontWeight="bold">Revenue types</Box>
            <Box fontSize="subtitle2.fontSize">There was no revenue on federal land in {props.cardTitle} in {dataSet}.</Box>
          </Box>
        )
      }
    </>
  )
}

export default RevenueDetailTypes
