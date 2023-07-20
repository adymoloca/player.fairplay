import { Typography } from "@mui/material";
import React from "react";
import MainCard from "ui-component/cards/MainCard";

// translation
import { useTranslation } from 'react-i18next';

const Info = () => {
    const { t } = useTranslation();

	return (
		<>
			<MainCard>
				<Typography fontSize={"16px"} fontWeight={"700"} padding={"10px"}>
					{t('infoLabel')}
				</Typography>
				<Typography padding={"10px"}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
					pharetra est in sapien tincidunt, sed lobortis augue interdum.
					Pellentesque congue, nibh posuere congue fringilla, nibh augue porta
					eros, quis pellentesque tellus elit in orci. Cras posuere sollicitudin
					lacus, nec consectetur metus cursus quis. Sed tincidunt ipsum sit amet
					leo fermentum suscipit. Donec eleifend mi laoreet sodales pretium.
					Quisque augue ipsum, convallis at orci vel, fermentum rutrum risus.
					Aenean malesuada lorem justo, congue maximus nisi lacinia sed.
					Pellentesque eget sollicitudin eros, ut feugiat tortor. Vestibulum
					ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
					curae; Nulla molestie nisi vitae massa scelerisque faucibus. Phasellus
					semper arcu vitae dignissim ultricies. In et velit arcu. Sed eget
					pulvinar justo. Quisque et mi urna. Duis nec aliquet arcu. In eu
					semper quam, vel porttitor purus. Nunc ac elit quis dolor luctus
					venenatis. Etiam dictum augue augue, id fringilla urna consectetur ut.
					Curabitur ex lorem, molestie id orci vel, maximus maximus risus. Morbi
					fermentum egestas porta. Mauris viverra tincidunt justo, quis
					condimentum nibh. Vivamus laoreet varius fringilla. Curabitur faucibus
					varius dolor, eget accumsan metus venenatis non. Praesent suscipit
					augue at diam bibendum mollis. Morbi leo diam, ornare at mollis vel,
					placerat non diam. Maecenas facilisis tincidunt posuere. Nulla
					facilisi. Suspendisse arcu diam, dignissim vitae nibh a, porttitor
					faucibus tellus. Cras leo libero, gravida vel maximus ac, porta at
					nibh. Vivamus a interdum quam. Proin tristique feugiat sollicitudin.
					Vivamus tempor diam vel tempor cursus. Nunc et tortor sit amet leo
					vehicula rhoncus in sed lacus. Phasellus at massa accumsan urna
					interdum vehicula. Curabitur ut massa sit amet mi accumsan varius id
					ut elit. Ut tempus dui vel orci auctor, at euismod mi rutrum. Lorem
					ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
					potenti. Duis id pulvinar risus, in finibus urna. Nunc sit amet
					faucibus nisl, vitae maximus nisi. Cras ac tortor a urna tempus auctor
					id id nisl. Duis tincidunt molestie felis, accumsan blandit odio
					tempus non. Donec iaculis efficitur turpis vitae rutrum. Praesent a mi
					sed magna venenatis accumsan et ac enim. Fusce mi mauris, sagittis in
					aliquet at, facilisis eget dui. Cras in accumsan eros. Nunc porta
					ipsum vel ex fringilla imperdiet. Ut eu lacinia nisl, eget pulvinar
					sapien. Integer vitae tempor ipsum, id lacinia elit. Orci varius
					natoque penatibus et magnis dis parturient montes, nascetur ridiculus
					mus. Nam tincidunt lacus dolor, in suscipit justo eleifend sed. Nullam
					molestie dignissim vehicula. Quisque vulputate augue mauris, quis
					bibendum leo porta in. Duis auctor lorem quis nisi ullamcorper
					commodo. Aliquam erat volutpat. Nam ultrices lacus elit, in tempor
					elit fermentum vitae. Proin eget ipsum fringilla, interdum odio in,
					vulputate arcu. Nulla a ligula dolor. Vestibulum scelerisque lorem
					eget nulla fringilla, in viverra erat feugiat.
				</Typography>
			</MainCard>
		</>
	);
};

export default Info;
