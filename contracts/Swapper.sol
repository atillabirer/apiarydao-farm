pragma solidity 0.6.12;

import "./HoneyCombToken.sol";
import "./HivePointsToken.sol";


contract Swapper {
    HoneyCombToken _hnyc;
    HiveInterface _hp;

   receive() external payable {

   }
   constructor(HoneyCombToken hnyc, HiveInterface hp) public {
       _hnyc = hnyc;
       _hp = hp;
   }
   function swap() public {
       //get balance of tokers for user
       
   }

}