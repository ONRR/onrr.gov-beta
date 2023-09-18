CREATE OR REPLACE FUNCTION ignore_empty_revenue()
  RETURNS TRIGGER
  LANGUAGE PLPGSQL
AS
$$
BEGIN
    
    IF NEW.accept_date is null 
        and NEW.land_class_code is null 
        and NEW.land_category_code_desc is null 
        and NEW.state is null 
        and NEW.county_code_desc is null 
        and NEW.fips_code is null 
        and NEW.agency_state_region_code_desc is null 
        and NEW.revenue_type is null 
        and NEW.mineral_production_code_desc is null 
        and NEW.commodity is null 
        and NEW.product_code_desc is null 
        and NEW.revenue is null
    THEN
        RETURN NULL;
    END IF;

    RETURN NEW;
END
$$;

CREATE TRIGGER monthly_revenue_elt_ignore_empty_bri
    BEFORE INSERT
    ON monthly_revenue_elt
    FOR EACH ROW
    EXECUTE FUNCTION ignore_empty_revenue();