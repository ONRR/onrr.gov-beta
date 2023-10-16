DROP TRIGGER IF EXISTS monthly_disbursement_elt_transform_fips_code_bri ON monthly_disbursement_elt;

CREATE TRIGGER monthly_disbursement_elt_transform_fips_code_bri
    BEFORE INSERT
    ON monthly_disbursement_elt
    FOR EACH ROW
    EXECUTE FUNCTION transform_fips_code_disbursement();