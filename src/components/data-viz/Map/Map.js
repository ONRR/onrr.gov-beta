/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import utils from '../../../js/utils'
import D3Map from './D3Map.js'

import { makeStyles } from '@material-ui/core/styles'

import {
  Box
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    '& .mapContainer': {
      height: '100%',
      width: '100%',
    },
    '& .map': {
      height: '100%',
      width: '100%',
    },
    '& .legend': {
      display: 'block',
      bottom: 50,
      left: 5,
      width: 300,
      height: 50,
      zIndex: 10,
      margin: '5px',
      position: 'absolute',
      padding: theme.spacing(1),
      '& svg': {
        top: 0,
      },
      '@media (max-width: 768px)': {
        bottom: 5,
      },
      '& .tick': {
        fontSize: theme.typography.body2,
      }
    }
  }
}))

/**
 * Map  a component for rendering maps dynamically from  data
 *
 * @param {string} [mapJson="https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json"]  mapJson - url to get the topojson used in map.
 * @param {string} [mapFeatures=counties] mapFeatures - A switch to view county data or state data
 * @param {string[][]} mapData - a two dimenstional arrray of fips and data, maybe county or state fips
 * @param {string} [colorScheme=green] colorScheme current lets you modify color from red to blue green or gray ;
 * @param {*} onClick function that determines what to do if area is clicked
 */

const Map = props => {
  // const mapJson=props.mapJson || "https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json";
  // use ONRR topojson file for land

  const mapJson = props.mapJson || '/maps/land/us-topology.json'
  const mapOffshoreJson =
        props.mapOffshoreJson || '/maps/offshore/offshore.json'
  const mapJsonObject = props.mapJsonObject

  const mapFeatures = props.mapFeatures || 'counties'
  //const mapData = props.mapData || []

  // mapData=props.offshoreData && mapData.concat(props.offshoreData);
  const elemRef = useRef(null)
  const colorScheme = props.colorScheme || 'green'
  const offshoreColorScheme = props.offshoreColorScheme || colorScheme
  const mapTitle = props.mapTitle
  const onClick =
        props.onClick ||
        function (d, i) {
          // console.debug('Default onClick function', d, i)
        }
  const classes = useStyles()
  const minColor = props.minColor
  const maxColor = props.maxColor
  const onZoom = props.onZoom || function () {
    // console.debug('Map   onZoom default')
  }
  const onZoomEnd = props.onZoomEnd || function () {
    // console.debug('Map   onZoomEnd default')
  }
  const mapZoom = props.mapZoom
  const mapX = props.mapX
  const mapY = props.mapY
  const { mapData, ...options } = props
  let map

  useEffect(() => {
    const us = mapJsonObject
    //    const offshore = mapJsonObject.offshore
    console.debug("OPTIONS: ", options)
    const data = observableData(mapData)
    data.title = mapTitle
    map = new D3Map(
      elemRef.current,
      us,
      mapFeatures,
      data,
      colorScheme,
      onClick,
      minColor,
      maxColor,
      mapZoom,
      mapX,
      mapY,
      options
    )

    map.onZoom = onZoom
    map.onZoomEnd = onZoomEnd
    if (!isNaN(mapX) && !isNaN(mapY) && !isNaN(mapZoom)) {
      map.zoom({ x: mapX, y: mapY, k: mapZoom })
    }

    if (props.zoomTo) {
      map.zoomTo(props.zoomTo)
    }
  }, [mapData, mapJsonObject])
  return (
    <Box className={classes.root}>
      <div className='mapContainer' ref={elemRef}>
        <div className='MuiPaper-root MuiPaper-rounded MuiPaper-elevation1 legend'></div>
        <div className='map'></div>
      </div>
    </Box>
  )
}

export default Map

/**
 *  The function that mimics ObservableMap() funtcion to allow minimal change to prototype.
 *
 *  @param {array[][]}  d - two diminational array of data
 *  @return {object} returns an object with values as an array keys as an array and a get accessor for getting the data
 *
 */

const observableData = d => {
  const r = { values: [], title: '', keyValues: {} }
  for (let ii = 0; ii < d.length; ii++) {
    r.values.push(d[ii][1])
    r.keyValues[d[ii][0]] = d[ii][1]
  }
  r.get = id => {
    return r.keyValues[id]
  }
  return r
}
