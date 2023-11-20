CREATE OR REPLACE VIEW federal_sales_v AS
SELECT id,
  calendar_year,
  land_class || ' ' || land_category as land_type,
  state_offshore_region,
  revenue_type,
  commodity,
  sales_volume,
  gas_volume,
  sales_value,
  royalty_value_prior_to_allowance,
  transportation_allowance,
  processing_allowance,
  royalty_value_less_allowance,
  effective_royalty_rate
FROM sales;