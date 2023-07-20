import { ArrowBackIosNewTwoTone } from "@mui/icons-material";
import React from "react";
import CardSecondaryAction from "ui-component/cards/CardSecondaryAction";
import MainCard from "ui-component/cards/MainCard";
import CollapseComp from '../../../../ui-component/collapse/CollapseComp';
import {renderFaq} from './renderFaq.js';

const Faq = () => {

    return(
        <>
            <MainCard title="F.A.Q" secondary={<CardSecondaryAction icon={<ArrowBackIosNewTwoTone/>} title={'Back'} link={'/'} />}>
                {renderFaq.map((item,index)=>{
                    return (
                        <CollapseComp key={`faq-key-${index}`} title={item?.title} collapsedContent={item?.collapsedContent}/>
                    )
                })}
            </MainCard>
        </>
    
    )
}
        
export default Faq;