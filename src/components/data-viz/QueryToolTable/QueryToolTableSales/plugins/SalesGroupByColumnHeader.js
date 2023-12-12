import React, { useContext } from 'react'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import {
  GroupBySelectInput,
  BreakoutBySelectInput
} from '../../../../inputs'
import BaseButtonInput from '../../../../inputs/BaseButtonInput'
import SalesHeaderSortLabel from './SalesHeaderSortLabel'
import { DataFilterContext } from '../../../../../stores'
import { BREAKOUT_BY } from '../../../../../constants'

const SalesGroupByColumnHeader = ({ onAddColumn, onRemoveColumn, groupByOptions, breakoutByOptions, ...props }) => {
  const { state } = useContext(DataFilterContext)
  const GroupByColumnHeader = () => {
    return (
      <Grid container alignItems="flex-start">
        <Grid item xs={(onAddColumn) ? 7 : 12}>
          <GroupBySelectInput data={groupByOptions} />
        </Grid>
        {onAddColumn &&
          <Grid item xs={5}>
            <BaseButtonInput onClick={onAddColumn} styleType={'link'} style={{ top: '-8px' }}>
              + Add column
            </BaseButtonInput>
          </Grid>
        }
      </Grid>
    )
  }

  const GroupByStickyColumnHeader = () => {
    return (
      <Grid container alignItems="flex-start">
        <Grid item xs={(onAddColumn) ? 9 : 12}>
          <Box mt={2} textAlign={'end'}>
            {props.column.title}
          </Box>
        </Grid>
        {onAddColumn &&
          <Grid item xs={3}>
            <BaseButtonInput onClick={onAddColumn} styleType={'link'} style={{ top: '-8px' }}>
              + Add column
            </BaseButtonInput>
          </Grid>
        }
      </Grid>
    )
  }

  const BreakoutByColumnHeader = () => {
    return (
      <Grid container alignItems="flex-start">
        <Grid item xs={(onRemoveColumn) ? 7 : 12}>
          <BreakoutBySelectInput data={breakoutByOptions} />
        </Grid>
        {onRemoveColumn &&
          <Grid item xs={5}>
            <BaseButtonInput onClick={onRemoveColumn} styleType={'link'} style={{ top: '-8px' }}>
              x Remove
            </BaseButtonInput>
          </Grid>
        }
      </Grid>
    )
  }

  return (
    <>
      {props.column.name === 'calendarYear' &&
        <SalesHeaderSortLabel {...props.children.props}><GroupByStickyColumnHeader /></SalesHeaderSortLabel>
      }
      {props.column.name === state[BREAKOUT_BY] &&
        <SalesHeaderSortLabel {...props.children.props}><BreakoutByColumnHeader /></SalesHeaderSortLabel>
      }
      {props.column.name !== 'calendarYear' &&
        <>{props.children}</>
      }
    </>
  )
}

export default SalesGroupByColumnHeader
