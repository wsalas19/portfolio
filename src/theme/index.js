import { extendTheme } from "@chakra-ui/react";
import "@fontsource/montserrat";

// 2. Add your color mode config
const config = {
	fonts: {
		heading: "Montserrat",
	},
};

// 3. extend the theme
const theme = extendTheme({ config });

export default theme;

/* let numbers = "1,2,3/3,2,1";
let split = numbers.split('/')
let divided = []
for (list of split){
  divided.push(list.split(','))
}
let sum = [];
for (let i = 0; i < divided[0].length; i++) {
      sum.push(parseInt(divided[0][i])+parseInt(divided[1][i]))
}
 */
