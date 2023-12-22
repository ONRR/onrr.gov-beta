DROP VIEW IF EXISTS download_federal_sales_v;

CREATE VIEW download_federal_sales_v AS
SELECT calendar_year "Date",
  calendar_year "Calendar Year",
  land_class "Land Class",
  land_category "Land Category",
  state_offshore_region "State/Offshore Region",
  revenue_type "Revenue Type",
  commodity "Commodity",
  TRIM(TO_CHAR(sales_volume, '999G999G999G999G999D99')) "Sales Volume",
  TRIM(TO_CHAR(gas_volume, '999G999G999G999G999D99')) "Gas MMBtu Volume",
  CONCAT('$', TRIM(TO_CHAR(sales_value, '999G999G999G999G999D99'))) "Sales Value",
  CONCAT('$', TRIM(TO_CHAR(royalty_value_prior_to_allowance, '999G999G999G999G999D99'))) "Royalty Value Prior to Allowances (RVPA)",
  CASE 
  WHEN transportation_allowance < 0 THEN
    CONCAT('-', '$', TRIM(TO_CHAR(ABS(transportation_allowance), '999G999G990.99')))
  WHEN transportation_allowance > 0 THEN
    CONCAT('$', TRIM(TO_CHAR(transportation_allowance, '999G999G990.99')))
  ELSE
    CONCAT('$', TRIM(TO_CHAR(transportation_allowance, '999G999G990.99')))
  END "Transportation Allowances (TA)",
  CASE 
  WHEN processing_allowance < 0 THEN
    CONCAT('-', '$', TRIM(TO_CHAR(ABS(processing_allowance), '999G999G990.99')))
  WHEN processing_allowance > 0 THEN
    CONCAT('$', TRIM(TO_CHAR(processing_allowance, '999G999G990.99')))
  ELSE
    CONCAT('$', TRIM(TO_CHAR(processing_allowance, '999G999G990.99')))
  END "Processing Allowances (PA)",
  CONCAT('$', TRIM(TO_CHAR(royalty_value_less_allowance, '999G999G999G999G999D99'))) "Royalty Value Less Allowances (RVLA)",
  CONCAT(TRIM(TO_CHAR(effective_royalty_rate * 100, '90D90')), '%') "Effective Royalty Rate"
FROM sales
ORDER BY commodity,
  calendar_year;