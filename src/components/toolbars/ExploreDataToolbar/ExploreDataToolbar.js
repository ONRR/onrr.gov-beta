import React, { useContext, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { navigate } from '@reach/router'

import { StoreContext } from '../../../store'
import { DataFilterContext } from '../../../stores/data-filter-store'
import BaseToolbar from '../BaseToolbar'

import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip
} from '@material-ui/core'

import {
  makeStyles
} from '@material-ui/styles'

import MapIcon from '@material-ui/icons/Map'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AddIcon from '@material-ui/icons/Add'

import {
  CommoditySelectInput,
  DataTypeSelectInput,
  FilterToggleInput,
  MapLevelToggleInput,
  PeriodSelectInput,
  OffshoreRegionSwitchInput
} from '../../inputs'

import YearSlider from '../../sections/ExploreData/YearSlider'

import MapControlToggle from '../../inputs/MapControlToggle'

import {
  COMMODITY,
  COUNTIES,
  COUNTY,
  DATA_FILTER_CONSTANTS as DFC,
  DATA_TYPE,
  DISBURSEMENT,
  PERIOD,
  PRODUCTION,
  REVENUE,
  US_STATE,
  OFFSHORE_REGIONS
} from '../../../constants'

import CONSTANTS from '../../../js/constants'

const EXPLORE_DATA_TOOLBAR_OPTIONS = {
  [DATA_TYPE]: [
    { value: REVENUE, option: 'Revenue' },
    { value: DISBURSEMENT, option: 'Disbursements' },
    { value: PRODUCTION, option: 'Production' },
  ],
  [PERIOD]: [
    { value: CONSTANTS.FISCAL_YEAR, option: 'Fiscal year' },
    // { value: CONSTANTS.CALENDAR_YEAR, option: 'Calendar year' },
    // { value: CONSTANTS.MONTHLY, option: 'Monthly' }
  ],
  [COUNTIES]: [
    { value: US_STATE, option: 'State' },
    { value: COUNTY, option: 'County' }
  ],
  [OFFSHORE_REGIONS]: [
    { value: false, option: '' },
    { value: true, option: '' }
  ]
}

const useStyles = makeStyles(theme => ({
  exploreDataToolbarWrapper: {
    backgroundColor: theme.palette.common.white,
    zIndex: 999,
    position: 'relative',
  },
  mapToolsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderLeft: `1px solid ${ theme.palette.grey[400] }`,
    paddingLeft: theme.spacing(2),
    marginLeft: theme.spacing(2),
    '& fieldset:first-child': {
      marginTop: 0,
    },
    '& fieldset:last-child': {
      marginTop: theme.spacing(3),
    },
    '& div:first-child': {
      marginTop: 0,
      marginRight: theme.spacing(4),
    },
  },
  toolbarIcon: {
    fill: theme.palette.links.default,
    width: '.75em',
    height: '.75em',
    marginRight: '.25em',
  },
  yearSliderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderLeft: `1px solid ${ theme.palette.grey[400] }`,
    paddingLeft: theme.spacing(2),
    marginLeft: theme.spacing(3),
    width: 350,
  },
  tooltipRoot: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
}))

const ExploreDataToolbar = props => {
  const data = useStaticQuery(graphql`
    query CommodityQuery {
      onrr {
        production_commodity: fiscal_production_summary(where: {commodity: {_neq: ""}}, distinct_on: commodity) {
          commodity
        }
        revenue_commodity: revenue_commodity_summary(where: {commodity: {_neq: ""}}, distinct_on: commodity) {
          commodity
        }
      }
    }
  `)

  const {
    onLink,
    cardMenuItems
  } = props

  const productionCommodityOptions = data.onrr.production_commodity.map(item => item.commodity)
  const revenueCommodityOptions = data.onrr.revenue_commodity.map(item => item.commodity)

  const classes = useStyles()
  const { state: filterState, updateDataFilter } = useContext(DataFilterContext)
  const { state: pageState } = useContext(StoreContext)

  const [exploreDataTabOpen, setExploreDataTabOpen] = useState(true)
  const [periodTabOpen, setPeriodTabOpen] = useState(false)
  const [locationTabOpen, setLocationTabOpen] = useState(false)
  const [exploreMoreTabOpen, setExploreMoreTabOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)

  const {
    dataType,
    commodity,
    counties,
    offshoreRegions
  } = filterState

  const {
    cards
  } = pageState

  const toggleExploreDataToolbar = event => {
    setExploreDataTabOpen(!exploreDataTabOpen)
    setPeriodTabOpen(false)
    setLocationTabOpen(false)
    setExploreMoreTabOpen(false)
  }

  const togglePeriodToolbar = event => {
    setPeriodTabOpen(!periodTabOpen)
    setExploreMoreTabOpen(false)
    setLocationTabOpen(false)
    setExploreDataTabOpen(false)
  }

  const toggleLocationToolbar = event => {
    setLocationTabOpen(!locationTabOpen)
    setExploreMoreTabOpen(false)
    setPeriodTabOpen(false)
    setExploreDataTabOpen(false)
  }

  const toggleExploreMoreToolbar = event => {
    setExploreMoreTabOpen(!exploreMoreTabOpen)
    setExploreDataTabOpen(false)
    setPeriodTabOpen(false)
    setLocationTabOpen(false)
  }

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (index, item) => event => {
    setAnchorEl(null)
    if (typeof item !== 'undefined') {
      onLink(item)
    }
  }

  return (
    <Box className={classes.exploreDataToolbarWrapper}>
      <BaseToolbar>
        <FilterToggleInput
          value="open"
          aria-label="Open explore data filters"
          defaultSelected={exploreDataTabOpen}
          selected={exploreDataTabOpen}
          onChange={toggleExploreDataToolbar}
        >
          <MapIcon className={classes.toolbarIcon} /> Explore data
        </FilterToggleInput>
        <FilterToggleInput
          value="open"
          aria-label="Open period filters"
          defaultSelected={periodTabOpen}
          selected={periodTabOpen}
          onChange={togglePeriodToolbar}>
          <CalendarIcon className={classes.toolbarIcon} /> Period
        </FilterToggleInput>
        <FilterToggleInput
          value="open"
          aria-label="Open location filters"
          defaultSelected={locationTabOpen}
          selected={locationTabOpen}
          onChange={toggleLocationToolbar}>
          <LocationOnIcon className={classes.toolbarIcon} /> Location
        </FilterToggleInput>
        <FilterToggleInput
          value="open"
          aria-label="Open explore more filters"
          defaultSelected={exploreMoreTabOpen}
          selected={exploreMoreTabOpen}
          onChange={toggleExploreMoreToolbar}>
          <MoreVertIcon className={classes.toolbarIcon} /> Explore more {dataType}
        </FilterToggleInput>
      </BaseToolbar>
      {exploreDataTabOpen &&
        <BaseToolbar isSecondary={true}>
          <DataTypeSelectInput
            dataFilterKey={dataType}
            data={EXPLORE_DATA_TOOLBAR_OPTIONS[DATA_TYPE]}
            defaultSelected={ dataType || REVENUE }
            label='Data type'
            selectType='Single'
            showClearSelected={false} />

          {(dataType === 'Revenue') &&
          <CommoditySelectInput
            dataFilterKey={COMMODITY}
            data={revenueCommodityOptions}
            defaultSelected={commodity}
            defaultSelectAll={typeof commodity === 'undefined'}
            label='Commodity'
            selectType='Multi'
            helperText='' />
          }

          <Box className={classes.mapToolsWrapper}>
            <MapLevelToggleInput
              dataFilterKey={COUNTIES}
              defaultSelected={counties || US_STATE}
              data={EXPLORE_DATA_TOOLBAR_OPTIONS[COUNTIES]}
              label="Map level toggle"
              legend="Map level"
              size="small" />

            <OffshoreRegionSwitchInput
              dataFilterKey={OFFSHORE_REGIONS}
              data={EXPLORE_DATA_TOOLBAR_OPTIONS[OFFSHORE_REGIONS]}
              defaultSelected={offshoreRegions}
              label='Show offshore'
              helperText=''
              disabled={dataType === 'Disbursements'}
              selectType='Single' />
          </Box>
        </BaseToolbar>
      }
      {periodTabOpen &&
        <BaseToolbar isSecondary={true}>
          <PeriodSelectInput
            dataFilterKey={PERIOD}
            data={EXPLORE_DATA_TOOLBAR_OPTIONS[PERIOD]}
            defaultSelected='Fiscal year'
            label='Period'
            selectType='Single'
            showClearSelected={false} />
          <Box className={classes.yearSliderWrapper}>
            <YearSlider />
          </Box>
        </BaseToolbar>
      }
      {locationTabOpen &&
        <BaseToolbar isSecondary={true}>
          <Box>
            {cardMenuItems &&
              cardMenuItems.map((item, i) => <MenuItem disabled={cards.some(c => c.abbr === item.name)} key={i} onClick={handleClose(i, item)}>{item.label}</MenuItem>)
            }
          </Box>
        </BaseToolbar>
      }
      {exploreMoreTabOpen &&
        <BaseToolbar isSecondary={true}>
          <Box>
            {dataType === REVENUE &&
                  <MapExploreMenu
                    linkLabels={['Query revenue data', 'Downloads & Documentation', 'How revenue works', 'Revenue by company']}
                    linkUrls={['/query-data/?dataType=Revenue', '/downloads/#Revenue', '/how-revenue-works/#revenues', '/how-revenue-works/federal-revenue-by-company/2018/']}
                  />
            }
            {dataType === DISBURSEMENT &&
                  <MapExploreMenu
                    linkLabels={['Query disbursements data', 'Downloads & Documentation', 'How disbursements works']}
                    linkUrls={['/query-data/?dataType=Disbursements', '/downloads/#Disbursements', '/how-revenue-works/#understanding-federal-disbursements']}
                  />
            }
            {dataType === PRODUCTION &&
                  <MapExploreMenu
                    linkLabels={['Query production data', 'Downloads & Documentation', 'How production works']}
                    linkUrls={['/query-data/?dataType=Production', '/downloads/#Production', '/how-revenue-works/#the-production-process']}
                  />
            }
          </Box>
        </BaseToolbar>
      }
    </Box>
  )
}

export default ExploreDataToolbar

// Map explore menu speed dial
const MapExploreMenu = props => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(true)

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = index => event => {
    // setAnchorEl(null)
    navigate(props.linkUrls[index])
  }

  return (
    <Box className={classes.mapExploreMenu}>
      <>
        {
          props.linkLabels.map((item, i) => <MenuItem key={i} onClick={handleClose(i)}>{item}</MenuItem>)
        }
      </>
    </Box>
  )
}
