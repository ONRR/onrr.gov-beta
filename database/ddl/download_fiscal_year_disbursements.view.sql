--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Debian 12.6-1.pgdg100+1)
-- Dumped by pg_dump version 12.6 (Debian 12.6-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: download_fiscal_year_disbursements; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.download_fiscal_year_disbursements AS
 SELECT period.period_date AS "Date",
    period.fiscal_year AS "Fiscal Year",
    fund.fund_type AS "Fund Type",
    fund.source AS "Source",
    location.state_name AS "State",
    location.county AS "County",
    disbursement.disbursement AS "Disbursement"
   FROM ((((public.disbursement
     JOIN public.period USING (period_id))
     JOIN public.location USING (location_id))
     JOIN public.commodity USING (commodity_id))
     JOIN public.fund USING (fund_id))
  WHERE ((period.period)::text = 'Fiscal Year'::text)
  ORDER BY period.period_date;


ALTER TABLE public.download_fiscal_year_disbursements OWNER TO postgres;

--
-- PostgreSQL database dump complete
--
