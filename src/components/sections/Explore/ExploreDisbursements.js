import React from 'react'
import Explore from './Explore'
import Link from '../../../components/Link'

const ExploreDisbursements = props => {
  return (
    <Explore
      title="and learn about disbursements"
	    contentLeft={
        <>
          <Link
            href="/explore/?dataType=Disbursements"
            linkType="ExploreData"
            mt={0}>
            Explore disbursements data
          </Link>
          <Link
				  href="/query-data/?dataType=Disbursements"
            linkType="FilterTable"
            mt={0}>
            Query disbursements data
			    </Link>
		    </>
		  }
		  contentCenter={
			  <>
          <Link
            href="/how-revenue-works#understanding-federal-disbursements"
            linkType="HowWorks"
            mt={0}>
            How disbursements work
			    </Link>
          <Link
            href="/data-by-state-offshore-region"
            linkType="Location"
            mt={0}>
            Data by state and offshore region
          </Link>
        </>
      }

      contentRight={
        <Link
          href="/downloads/#Disbursements"
          linkType="DownloadData"
          mt={0}>
          Downloads and documentation
        </Link>
      }
    />
  )
}

export default ExploreDisbursements
