CREATE TRIGGER monthly_revenue_elt_sanitize_nulls_bri
    BEFORE INSERT
    ON monthly_revenue_elt
    FOR EACH ROW
    EXECUTE FUNCTION sanitize_nulls_revenue();