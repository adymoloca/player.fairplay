import React, { useState } from 'react';
import SearchPlayer from './searchPlayer/SearchPlayer';
import { Box } from '@mui/material';
import SearchFields from './searchFields/SearchFields';
import SearchMatches from './searchMatches/SearchMatches';

// translation
import { useTranslation } from 'react-i18next';

const Search = () => {
    const { t } = useTranslation();

    const [searchIndex, setSearchIndex] = useState(0);

    return (
        <>
            <Box display={'flex'} justifyContent={'start'}>
                <Box sx={{width: '120px', height: '40px', backgroundColor: `${searchIndex === 0 ? '#fff' : '#F9F9FC'}`, display: 'flex', justifyContent: 'center', alignItems: 'center',
                    fontSize: '1.2em', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', mr: 1, cursor: 'pointer'}} onClick={()=>setSearchIndex(0)}>
                        {t('playersLabel')}
                </Box>
                <Box sx={{width: '120px', height: '40px', backgroundColor: `${searchIndex === 1 ? '#fff' : '#F9F9FC'}`, display: 'flex', justifyContent: 'center', alignItems: 'center',
                    fontSize: '1.2em', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', mr: 1, cursor: 'pointer'}} onClick={()=>setSearchIndex(1)}>
                        {t('matchesLabel')}
                </Box>
                <Box sx={{width: '120px', height: '40px', backgroundColor: `${searchIndex === 2 ? '#fff' : '#F9F9FC'}`, display: 'flex', justifyContent: 'center', alignItems: 'center',
                    fontSize: '1.2em', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', mr: 1, cursor: 'pointer'}} onClick={()=>setSearchIndex(2)}>
                        {t('fieldsLabel')}
                </Box>
            </Box>
            {searchIndex === 0 ? <SearchPlayer /> : (searchIndex ===1 ? <SearchMatches /> : <SearchFields />)}
        </>
    )
}

export default Search;