import React, { useEffect } from 'react';

import MainCard from 'ui-component/cards/MainCard';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { ArrowBackIosNewTwoTone } from '@mui/icons-material';
import FieldHero from './fieldsComp/FieldHero';
import { Grid, useMediaQuery } from '@mui/material';
import FieldDescription from './fieldsComp/FieldDescription';
import { useDispatch, useSelector } from 'react-redux';
import { getFieldId } from 'store/actions/fieldsActions';
import ErrorPage from 'ui-component/error';

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/styles';

const FieldPage = () => {
    const fieldData = useSelector((state)=> state?.fieldsState?.field);
	const fieldId = useSelector((state)=> state?.utilsState?.utils?.fieldId);
	const loadingField = useSelector((state)=>state?.fieldsState?.loading);
	const errorField = useSelector((state)=>state?.fieldsState?.error?.status);
    const dispatch = useDispatch();
	const { t } = useTranslation();

	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        dispatch(getFieldId(fieldId))
    }, [dispatch,fieldId])
    
	return (
	<>
		<MainCard title={t('fieldLabel')} secondary={<CardSecondaryAction icon={<ArrowBackIosNewTwoTone />} title={t('backTooltip')} link={'/all-fields'} />}
			transparent contentSX={{ p: matchDownMD && 0, m: matchDownMD && 0}} >
            { errorField && Object.keys(fieldData)?.length < 1 ? <ErrorPage error={errorField} /> : 
				<Grid item container xs={12} justifyContent={'center'} sx={{ mt: matchDownMD && 2}}>
					<FieldHero fieldData={fieldData} loadingField={loadingField}/>
					<FieldDescription />
				</Grid>
			}
		</MainCard>
	</>
	);
};
export default FieldPage;
