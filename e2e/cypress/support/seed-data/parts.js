const parts = [
	{
	  partName: "RGB Diffused Common Anode",
	  partPurchaseURL:
		"https://www.switchelectronics.co.uk/products/rgb-5mm-led-common-anode?currency=GBP&variant=45356647678261&utm_source=google&utm_medium=cpc&utm_campaign=Google%20Shopping&stkn=bbf1d20e1ed7&srsltid=AfmBOordsEaTCMF3J6-AfcD8vk8QcPcC4K0zzVISH52cC488Kxe1qaONR70",
	  projectId: 1,
	},
	{
	  partName: "RGB Diffused Common Cathode",
	  partPurchaseURL:
		"https://www.digikey.com/en/products/detail/kingbright/WP154A4SUREQBFZGC/3084119?gclsrc=aw.ds&&utm_adgroup=&utm_source=google&utm_medium=cpc&utm_campaign=PMax%20Shopping_Product_Medium%20ROAS%20Categories&utm_term=&utm_content=&utm_id=go_cmp-20223376311_adg-_ad-__dev-c_ext-_prd-3084119_sig-Cj0KCQjwytS-BhCKARIsAMGJyzrndzRh4UpTxjP3dwh6qtEhRVr52As-iIISKbIm8my87wMmszzNOGQaApWuEALw_wcB&gad_source=4&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzrndzRh4UpTxjP3dwh6qtEhRVr52As-iIISKbIm8my87wMmszzNOGQaApWuEALw_wcB&gclsrc=aw.ds",
	  projectId: 1,
	},
	{
	  partName: "Arduino UNO",
	  partPurchaseURL:
		"https://www.amazon.com/Arduino-A000066-ARDUINO-UNO-R3/dp/B008GRTSV6/ref=sr_1_1?dib=eyJ2IjoiMSJ9.MazmhFfn-DF8W5oyX_S-tOEIL3Mn9mSmjkjyDbHeCT06bz8eyqHpr8DjfILgxn8h3AezZ0AWO4gHNvPcSbcqnN6J4BznSJSg3uvZD5EQ-B4Pnd6tSKtk8jTXFNQSUhEW4QATVOYIgL8vPnz1GzYsudrN0tgiJ-GI1qeUgYahF0re-bvcT-r1zcE3wXoPBm1a-L5KNnHMjr0Fk0dB8H6q_0Vx79X5Msm4zzOeGLpSSgQ.xH6ic01UZP3NN0Mbe0wF7ObzOpubdw3EcRFSVeilpWg&dib_tag=se&hvadid=557574772208&hvdev=c&hvlocphy=9007851&hvnetw=g&hvqmt=e&hvrand=8349769826119925036&hvtargid=kwd-20840843967&hydadcr=2549_13510196&keywords=arduino+uno&mcid=161b3bd4228c3f91b7717f7227e9e546&qid=1742058541&sr=8-1",
	  projectId: 1,
	},
	{
	  partName: "Breadboard (generic)",
	  partPurchaseURL:
		"https://www.amazon.com/BB400-Solderless-Plug-BreadBoard-tie-points/dp/B0040Z1ERO/ref=asc_df_B0040Z1ERO?mcid=8537ae394369376cb9c2a9371b24205e&hvocijid=1054439975421447010-B0040Z1ERO-&hvexpln=73&tag=hyprod-20&linkCode=df0&hvadid=721245378154&hvpos=&hvnetw=g&hvrand=1054439975421447010&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9007851&hvtargid=pla-2281435179738&psc=1",
	  projectId: 1,
	},
	{
	  partName: "Jumper wires (generic)",
	  partPurchaseURL:
		"https://www.digikey.com/en/products/detail/bud-industries/BC-32670/5291564?gclsrc=aw.ds&&utm_adgroup=General&utm_source=google&utm_medium=cpc&utm_campaign=PMax%20Shopping_Supplier_Bud%20Industries_0377_Co-op&utm_term=&utm_content=General&utm_id=go_cmp-20504612364_adg-_ad-__dev-c_ext-_prd-5291564_sig-Cj0KCQjwytS-BhCKARIsAMGJyzrX-guhy8ANn1zwXlmm-GungnGqmVNIKpa3JQUiKOfWCoRp-hqEzMYaAirCEALw_wcB&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzrX-guhy8ANn1zwXlmm-GungnGqmVNIKpa3JQUiKOfWCoRp-hqEzMYaAirCEALw_wcB&gclsrc=aw.ds",
	  projectId: 1,
	},
	{
	  partName: "Resistor 220 ohm",
	  partPurchaseURL:
		"https://www.digikey.com/en/products/detail/stackpole-electronics-inc/CF14JT220R/1830334?gclsrc=aw.ds&&utm_adgroup=&utm_source=google&utm_medium=cpc&utm_campaign=Pmax_Shopping_Stackpole_0738_Co-op&utm_term=&utm_content=&utm_id=go_cmp-20688992636_adg-_ad-__dev-c_ext-_prd-1830334_sig-Cj0KCQjwytS-BhCKARIsAMGJyzq0MwABmqOkz69zNnfOpGha_N2hsSfe0YB44Mb9w-ORfqpGfpIxnYIaAgl8EALw_wcB&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzq0MwABmqOkz69zNnfOpGha_N2hsSfe0YB44Mb9w-ORfqpGfpIxnYIaAgl8EALw_wcB&gclsrc=aw.ds",
	  projectId: 1,
	},
  
	{
	  partName: "Arduio UNO (SMT)",
	  partPurchaseURL:
		"https://store.arduino.cc/products/arduino-uno-rev3-smd?srsltid=AfmBOoqS9c5VEQkCV0ApDHUfvzSOF8mS_3UmEIzlZ7qMiexzSp8I7ng5",
	  projectId: 15,
	},
	{
	  partName: "NeoPixel strip",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256806542970058.html?src=google&pdp_npi=4%40dis%21USD%213.11%213.11%21%21%21%21%21%40%2112000044821575965%21ppc%21%21%21&src=google&albch=shopping&acnt=708-803-3821&isdl=y&slnk=&plac=&mtctp=&albbt=Google_7_shopping&aff_platform=google&aff_short_key=UneMJZVf&gclsrc=aw.ds&albagn=888888&ds_e_adid=&ds_e_matchtype=&ds_e_device=c&ds_e_network=x&ds_e_product_group_id=&ds_e_product_id=en3256806542970058&ds_e_product_merchant_id=109105525&ds_e_product_country=US&ds_e_product_language=en&ds_e_product_channel=online&ds_e_product_store_id=&ds_url_v=2&albcp=19686377402&albag=&isSmbAutoCall=false&needSmbHouyi=false&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzrF9WVUyl7XL2B23BnsQpG2BuPxPnAr_8IF97AAogzqhDc0a3LY3AcaAjf2EALw_wcB&gatewayAdapt=glo2usa",
	  projectId: 15,
	},
	{
	  partName: "Rubber/Plastic wheel",
	  partPurchaseURL:
		"https://www.digikey.com/en/products/detail/sparkfun-electronics/ROB-13259/6163658?gclsrc=aw.ds&&utm_adgroup=&utm_source=google&utm_medium=cpc&utm_campaign=PMax%20Shopping_Product_Medium%20ROAS%20Categories&utm_term=&utm_content=&utm_id=go_cmp-20223376311_adg-_ad-__dev-c_ext-_prd-6163658_sig-Cj0KCQjwytS-BhCKARIsAMGJyzpsqwlj8gKAfQuoiOBCseRdY1DnOhppLf8CozKqRNxgwgH19FKKqfQaAl3OEALw_wcB&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzpsqwlj8gKAfQuoiOBCseRdY1DnOhppLf8CozKqRNxgwgH19FKKqfQaAl3OEALw_wcB&gclsrc=aw.ds",
	  projectId: 15,
	},
	{
	  partName: "9V Battery Clip",
	  partPurchaseURL:
		"https://www.digikey.com/en/products/detail/keystone-electronics/232/303804?gclsrc=aw.ds&&utm_adgroup=&utm_source=google&utm_medium=cpc&utm_campaign=PMax%20Shopping_Product_Low%20ROAS%20Categories&utm_term=&utm_content=&utm_id=go_cmp-20243063506_adg-_ad-__dev-c_ext-_prd-303804_sig-Cj0KCQjwytS-BhCKARIsAMGJyzrTloWphPI-U6MfVgu3_Ig0fksjVmQCb2lHJpUhHWa1lk-HfjyF0ZoaAlxOEALw_wcB&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzrTloWphPI-U6MfVgu3_Ig0fksjVmQCb2lHJpUhHWa1lk-HfjyF0ZoaAlxOEALw_wcB&gclsrc=aw.ds",
	  projectId: 15,
	},
	{
	  partName: "Modulo Bluetooth HC05",
	  partPurchaseURL:
		"https://www.getfpv.com/hc-05-rf-wireless-bluetooth-transceiver-module-rs232-ttl-to-uart-converter-and-adapter.html?utm_source=google&utm_medium=cpc&utm_campaign=DM+-+NB+-+PMax+-+Shop+-+No-index+-+SM+-+ALL+%7C+Full+Funnel&utm_content=pmax_x&utm_keyword=&utm_matchtype=&campaign_id=20799936859&network=x&device=c&gc_id=20799936859&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzranl_M6q2dIU666ZkgYC4Nzcq0w_8iS0UXR4_sqLF6ZGkqni1voccaAh81EALw_wcB",
	  projectId: 15,
	},
	{ partName: "9V Battery", projectId: 15 },
	{
	  partName: "2100 RPM Dual Shaft BO Motor - Straight",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256806832691475.html?src=google&pdp_npi=4%40dis%21USD%211.33%211.33%21%21%21%21%21%40%2112000039098256545%21ppc%21%21%21&src=google&albch=shopping&acnt=708-803-3821&isdl=y&slnk=&plac=&mtctp=&albbt=Google_7_shopping&aff_platform=google&aff_short_key=UneMJZVf&gclsrc=aw.ds&albagn=888888&ds_e_adid=&ds_e_matchtype=&ds_e_device=c&ds_e_network=x&ds_e_product_group_id=&ds_e_product_id=en3256806832691475&ds_e_product_merchant_id=5549986406&ds_e_product_country=US&ds_e_product_language=en&ds_e_product_channel=online&ds_e_product_store_id=&ds_url_v=2&albcp=20542171673&albag=&isSmbAutoCall=false&needSmbHouyi=false&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzoal1YXmRgHYINORMome2tdK6bvt8GmiAZILxFJzDbzmhieJTfSF-4aAgQNEALw_wcB&gatewayAdapt=glo2usa",
	  projectId: 15,
	},
	{ partName: "Sunboard", projectId: 15 },
	{
	  partName: "Resistors kit",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256802931411953.html?pdp_npi=3%40dis%21EUR%212.01%211.91%21%21%21%21%21%40211647d417005672394226954dbd46%2112000024192658374%21affd%21%21&aff_fcid=bf08aaca9cdc4503bdcfda3a406669bd-1742059772146-01706-_opcCMM7&aff_fsk=_opcCMM7&aff_platform=portals-billboard-sea&sk=_opcCMM7&aff_trace_key=bf08aaca9cdc4503bdcfda3a406669bd-1742059772146-01706-_opcCMM7&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 3,
	},
	{
	  partName: "PN2222A Transistor",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/2255800644073151.html?aff_fcid=9ec6af2431794d5585d066f710411b3a-1742059834124-05419-_DCXO02n&tt=CPS_NORMAL&aff_fsk=_DCXO02n&aff_platform=shareComponent-detail&sk=_DCXO02n&aff_trace_key=9ec6af2431794d5585d066f710411b3a-1742059834124-05419-_DCXO02n&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 3,
	},
	{
	  partName: "AMS1117 5V DC-DC Step Down Power Supply Module",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/2255800749771553.html?aff_fcid=69c2b25e0d4942d3b3391ddff30d8eed-1742059871345-00969-_oohN2Jn&tt=CPS_NORMAL&aff_fsk=_oohN2Jn&aff_platform=shareComponent-detail&sk=_oohN2Jn&aff_trace_key=69c2b25e0d4942d3b3391ddff30d8eed-1742059871345-00969-_oohN2Jn&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 3,
	},
	{
	  partName: "Potentiometers",
	  partPurchaseURL:
		"https://www.amazon.com/Gikfun-Knurled-Linear-Potentiometer-Arduino/dp/B0146DJWFU?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A34K5WF5Z9R33P",
	  projectId: 3,
	},
	{
	  partName: "Water pump",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256807357892704.html?aff_fcid=eac1eeee9bbc4b1c8a5c97145db29dbb-1742059897421-00082-_oFcdikn&tt=CPS_NORMAL&aff_fsk=_oFcdikn&aff_platform=shareComponent-detail&sk=_oFcdikn&aff_trace_key=eac1eeee9bbc4b1c8a5c97145db29dbb-1742059897421-00082-_oFcdikn&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 3,
	},
	{
	  partName: "Push button",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256802610314619.html?aff_fcid=321e384ff6084059a176c0a1beaa9f31-1742059913440-04764-_DmPLLPD&tt=CPS_NORMAL&aff_fsk=_DmPLLPD&aff_platform=shareComponent-detail&sk=_DmPLLPD&aff_trace_key=321e384ff6084059a176c0a1beaa9f31-1742059913440-04764-_DmPLLPD&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 3,
	},
	{
	  partName: "9V Battery Holder 9V Battery Box With Cover",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256805354978317.html?aff_fcid=0a59feaeceee4f6895c8b8b0ae25cf17-1742059940685-05457-_oldZBU5&tt=CPS_NORMAL&aff_fsk=_oldZBU5&aff_platform=shareComponent-detail&sk=_oldZBU5&aff_trace_key=0a59feaeceee4f6895c8b8b0ae25cf17-1742059940685-05457-_oldZBU5&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 3,
	},
	{
	  partName: "LED Bezel",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256804679800516.html?aff_fcid=6e7455e400e1406880bf7126f5e76a51-1742060004592-08718-_Dd1QcQ9&tt=CPS_NORMAL&aff_fsk=_Dd1QcQ9&aff_platform=shareComponent-detail&sk=_Dd1QcQ9&aff_trace_key=6e7455e400e1406880bf7126f5e76a51-1742060004592-08718-_Dd1QcQ9&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt&_randl_shipto=US",
	  projectId: 3,
	},
	{
	  partName: "Barrel plug",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256806793365991.html?aff_fcid=9ec94e7a631244d6a010ec43e19c2aae-1742060027655-02103-_DFv2Jfp&tt=CPS_NORMAL&aff_fsk=_DFv2Jfp&aff_platform=shareComponent-detail&sk=_DFv2Jfp&aff_trace_key=9ec94e7a631244d6a010ec43e19c2aae-1742060027655-02103-_DFv2Jfp&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 3,
	},
	{
	  partName: "Switch button",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/2251832636235140.html?aff_fcid=b743ad91a7e544ca9efe69c122827734-1742060127869-02044-_Dlzrngv&tt=CPS_NORMAL&aff_fsk=_Dlzrngv&aff_platform=shareComponent-detail&sk=_Dlzrngv&aff_trace_key=b743ad91a7e544ca9efe69c122827734-1742060127869-02044-_Dlzrngv&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 3,
	},
	{
	  partName: "LED",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256806019669160.html?aff_fcid=16cba39158c44152a904b9d74165736f-1742060155942-06950-_DCA6aMf&tt=CPS_NORMAL&aff_fsk=_DCA6aMf&aff_platform=shareComponent-detail&sk=_DCA6aMf&aff_trace_key=16cba39158c44152a904b9d74165736f-1742060155942-06950-_DCA6aMf&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 3,
	},
	{
	  partName: "Mini Breadboard",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256806379892335.html?aff_fcid=38c41e20c6e843c98b7e3749eb26fbc6-1742060185955-08089-_ol029J1&tt=CPS_NORMAL&aff_fsk=_ol029J1&aff_platform=shareComponent-detail&sk=_ol029J1&aff_trace_key=38c41e20c6e843c98b7e3749eb26fbc6-1742060185955-08089-_ol029J1&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 3,
	},
	{
	  partName: "Water pump pipe",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256807357892704.html?aff_fcid=8d0b3757a1c540459d6a6da643174661-1742060261784-07176-_oFcdikn&tt=CPS_NORMAL&aff_fsk=_oFcdikn&aff_platform=shareComponent-detail&sk=_oFcdikn&aff_trace_key=8d0b3757a1c540459d6a6da643174661-1742060261784-07176-_oFcdikn&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 3,
	},
	{
	  partName: "CR2032 Battery",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256807454077486.html?aff_fcid=90161116532844519e10b840d11fa87f-1742060336898-05842-_onZjqrL&tt=CPS_NORMAL&aff_fsk=_onZjqrL&aff_platform=shareComponent-detail&sk=_onZjqrL&aff_trace_key=90161116532844519e10b840d11fa87f-1742060336898-05842-_onZjqrL&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 3,
	},
	{
	  partName: "DS1302 module",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256805610096692.html?aff_fcid=e7a7e96e54d140da889348ba57dc24f2-1742060364272-09385-_DCd5HO7&tt=CPS_NORMAL&aff_fsk=_DCd5HO7&aff_platform=shareComponent-detail&sk=_DCd5HO7&aff_trace_key=e7a7e96e54d140da889348ba57dc24f2-1742060364272-09385-_DCd5HO7&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 3,
	},
	{
	  partName: "Arduino Nano",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/2251832657716454.html?aff_fcid=409d5089d42642b68d64303b936b47bb-1742060396619-03031-_DFQwlJh&tt=CPS_NORMAL&aff_fsk=_DFQwlJh&aff_platform=shareComponent-detail&sk=_DFQwlJh&aff_trace_key=409d5089d42642b68d64303b936b47bb-1742060396619-03031-_DFQwlJh&terminal_id=01474781c04c4c0ebf9de4fb38594320&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 3,
	},
  
	{
	  partName: "Capacitive Touch Sensor",
	  partPurchaseURL:
		"https://www.ebay.de/itm/TTP223-Arduino-Capacitive-Kapazitiver-Touch-Sensor-Arduino-Raspberry-Pi/253381740902?hash=item3afeba8966:m:m936VeyBQpNxzZwQr37OUzw",
	  projectId: 4,
	},
	{
	  partName: "capacitor 100nF 100V",
	  partPurchaseURL:
		"https://www.rcscomponents.kiev.ua/product/100nf-100v-x7r-10-0805-3k-reel-c0805b104k101n3-hitano-kondensator-keramichnyi-smd_20281.html",
	  projectId: 4,
	},
	{
	  partName: "Arduino Nano",
	  partPurchaseURL: "https://store.arduino.cc/products/arduino-nano",
	  projectId: 4,
	},
	{
	  partName: "Resistor 100k _1206",
	  partPurchaseURL:
		"https://www.ebay.com/itm/Chip-Resistor-SMD-0201-5-Tolerance-0ohm-1-8Kohm-/191881597626?var=&hash=item2cad08d2ba:m:mRsGyRi-pvjtowIN2liAklw",
	  projectId: 4,
	},
	{
	  partName: "Resistor 4,7 kOhm 5% 1/16W 50V",
	  partPurchaseURL:
		"https://www.ebay.com/sch/i.html?_odkw=RC0402JR-100KR-Hitano&_osacat=0&_from=R40&_trksid=p2045573.m570.l1313.TR0.TRC0.H0.XRC0402JR-074K7L-Yageo.TRS0&_nkw=RC0402JR-074K7L-Yageo&_sacat=0",
	  projectId: 4,
	},
	{
	  partName: "Led matrix 8x32",
	  partPurchaseURL:
		"https://www.seeedstudio.com/8x32-RGB-LED-Matrix-w-WS2812B-DC-5V-p-2012.html?srsltid=AfmBOoq8rdPkPihlOstzF3Xc8rkgn5B41GSq0XQvSku2y0-ddRuX3h16",
	  projectId: 4,
	},
	{ partName: "Soldering kit", projectId: 4 },
	{
	  partName: "Arduino Uno Rev3",
	  partPurchaseURL:
		"https://www.amazon.com/Arduino-A000066-ARDUINO-UNO-R3/dp/B008GRTSV6/ref=sr_1_1?dib=eyJ2IjoiMSJ9.EP1e3hJTqCDPxSPSdzKsYfMXUktq8xgEbcPrB1QpS3WGWh1QsqeJ-IjtzwhO-kZln1m1xkTqYryiU8T-AKybc1tH5tLyD6ROoo5ye8kB3FkLqFhF0SXGggjrCrZV2SeLOj7pzLU9Tcq6mAlA3k8qf19cRfeH_EyQ-fM_LmAbn2G9AXE8G2F2RR2rHU_cQUWaOnyzIYuX8CKVyQIHG3wdrMbrBhmlTvfLmPIa5o5A-sU.3rmVnX-khVbYAkL8boSxk5cUVIzS_ycnHeBQNumRc5g&dib_tag=se&hvadid=557586768647&hvdev=c&hvlocphy=9007851&hvnetw=g&hvqmt=e&hvrand=8884618540377138621&hvtargid=kwd-31851399271&hydadcr=18006_13447338&keywords=arduino+uno+rev3&mcid=775f3f857b503ef5b41645308fd53ff8&qid=1742060852&sr=8-1",
	  projectId: 5,
	},
	{
	  partName: "SSD1306 OLED Display",
	  partPurchaseURL:
		"https://www.amazon.com/HiLetgo-Serial-128X64-Display-Color/dp/B06XRBYJR8/ref=asc_df_B06XRBYJR8?mcid=1888c23ac29939dbac707838484efd9d&hvocijid=13755204498935906391-B06XRBYJR8-&hvexpln=73&tag=hyprod-20&linkCode=df0&hvadid=721245378154&hvpos=&hvnetw=g&hvrand=13755204498935906391&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9007851&hvtargid=pla-2281435178098&th=1",
	  projectId: 5,
	},
	{
	  partName: "Breadboard - 400 contacts",
	  partPurchaseURL:
		"https://www.amazon.com/BB400-Solderless-Plug-BreadBoard-tie-points/dp/B0040Z1ERO/ref=asc_df_B0040Z1ERO?mcid=8537ae394369376cb9c2a9371b24205e&hvocijid=11572276193482500513-B0040Z1ERO-&hvexpln=73&tag=hyprod-20&linkCode=df0&hvadid=721245378154&hvpos=&hvnetw=g&hvrand=11572276193482500513&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9007851&hvtargid=pla-2281435179738&psc=1",
	  projectId: 5,
	},
	{
	  partName: "USB 2.0 Cable Type A/B",
	  partPurchaseURL:
		"https://www.amazon.com/Printer-Scanner-Brother-Laptop-Samsung/dp/B0CZCL2JB5/ref=asc_df_B0CZCL2JB5?mcid=4452684646b034ceac35632e34c154d0&hvocijid=6519169611970985362-B0CZCL2JB5-&hvexpln=73&tag=hyprod-20&linkCode=df0&hvadid=721245378154&hvpos=&hvnetw=g&hvrand=6519169611970985362&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9007851&hvtargid=pla-2281435176898&psc=1",
	  projectId: 5,
	},
  
	{
	  partName: "Ultrasonic Sensor Module",
	  partPurchaseURL:
		"https://quartzcomponents.com/products/hc-sr04-ultrasonic-sensor-module?_pos=1&_sid=51eec7468&_ss=r&sca_ref=875164.0WmzaRK6Sn",
	  projectId: 6,
	},
	{
	  partName: "IR Sensor Module - LM393",
	  partPurchaseURL:
		"https://quartzcomponents.com/products/ir-lm393-photoelectric-sensor-module?_pos=1&_sid=cf2dcffe0&_ss=r&sca_ref=875164.0WmzaRK6Sn",
	  projectId: 6,
	},
	{
	  partName: "Arduino Uno Rev3",
	  partPurchaseURL: "https://store.arduino.cc/products/arduino-uno-rev3",
	  projectId: 6,
	},
	{
	  partName: "4 DOF Acrylic Robotic DIY Arm Kit",
	  partPurchaseURL:
		"https://quartzcomponents.com/products/4-dof-wooden-robotic-arm?_pos=1&_sid=d9bb950bf&_ss=r&sca_ref=875164.0WmzaRK6Sn",
	  projectId: 6,
	},
	{
	  partName: "16-Channel 12-bit PWM/Servo Driver I2C interface PCA9685",
	  partPurchaseURL:
		"https://robu.in/product/16-channel-12-bit-pwmservo-driver-i2c-interface-pca9685-arduino-raspberry-pi/?gclid=Cj0KCQjwiIOmBhDjARIsAP6YhSXrXy0Is9C1EQILuJt_ymTmiMpuG0V5D5CpUTz8LNdtLbsUkfOtpGgaAsXWEALw_wcB",
	  projectId: 6,
	},
	{
	  partName: "Tower Pro SG90 Servo Motor",
	  partPurchaseURL:
		"https://quartzcomponents.com/products/tower-pro-sg90-servo-9-gms-mini-micro-servo-motor?_pos=1&_sid=22265d8d7&_ss=r&sca_ref=875164.0WmzaRK6Sn",
	  projectId: 6,
	},
	{
	  partName: "Arduino Micro",
	  partPurchaseURL: "https://store.arduino.cc/products/arduino-micro",
	  projectId: 7,
	},
	{
	  partName: "W5500 mini Ethernet module",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256804492973946.html?src=google&pdp_npi=4%40dis%21USD%213.35%213.35%21%21%21%21%21%40%2112000030074096066%21ppc%21%21%21&src=google&albch=shopping&acnt=708-803-3821&isdl=y&slnk=&plac=&mtctp=&albbt=Google_7_shopping&aff_platform=google&aff_short_key=UneMJZVf&gclsrc=aw.ds&albagn=888888&ds_e_adid=&ds_e_matchtype=&ds_e_device=c&ds_e_network=x&ds_e_product_group_id=&ds_e_product_id=en3256804492973946&ds_e_product_merchant_id=107683874&ds_e_product_country=US&ds_e_product_language=en&ds_e_product_channel=online&ds_e_product_store_id=&ds_url_v=2&albcp=19678427463&albag=&isSmbAutoCall=false&needSmbHouyi=false&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzrJMlwCTUiL9hDtY94iYgdhqv8_6KIPHZr3efsXZ8w9aX5Qyg-xQZAaAkJZEALw_wcB&gatewayAdapt=glo2usa",
	  projectId: 7,
	},
  
	{
	  partName: "Ultrasonic Sensor - HC-SR04",
	  partPurchaseURL:
		"https://www.getfpv.com/hc-sr04-ultrasonic-distance-sensor-module.html?utm_source=google&utm_medium=cpc&utm_campaign=DM+-+NB+-+PMax+-+Shop+-+No-index+-+SM+-+ALL+%7C+Full+Funnel&utm_content=pmax_x&utm_keyword=&utm_matchtype=&campaign_id=20799936859&network=x&device=c&gc_id=20799936859&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzoXs2ic6QOHeNXm-TzIMskngkZx0EAI4HZCO25mo8zSHFUhPCqwBLwaArZYEALw_wcB",
	  projectId: 8,
	},
	{
	  partName: `HiLetgo ILI9341 2.8" SPI TFT LCD Display`,
	  partPurchaseURL:
		"https://www.amazon.com/HiLetgo-240X320-Resolution-Display-ILI9341/dp/B073R7BH1B/ref=asc_df_B073R7BH1B?mcid=c7738c71b22d3f25a76e2d47be3be95a&hvocijid=7612475253577397777-B073R7BH1B-&hvexpln=73&tag=hyprod-20&linkCode=df0&hvadid=721245378154&hvpos=&hvnetw=g&hvrand=7612475253577397777&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9007851&hvtargid=pla-2281435179258&psc=1",
	  projectId: 8,
	},
	{ partName: "Resistor 2.2 kohms", projectId: 8 },
	{
	  partName: "Arduino Nano",
	  partPurchaseURL: "https://store.arduino.cc/products/arduino-nano",
	  projectId: 8,
	},
  
	{
	  partName: "IR receiver (generic)",
	  partPurchaseURL: "https://www.adafruit.com/product/157",
	  projectId: 9,
	},
	{
	  partName: "Arduino UNO",
	  partPurchaseURL: "https://docs.arduino.cc/hardware/uno-rev3/",
	  projectId: 9,
	},
	{
	  partName: "JustBoom IR Remote",
	  partPurchaseURL:
		"https://www.alibaba.com/product-detail/p_1601277608913.html?mark=google_shopping&gQT=1",
	  projectId: 9,
	},
  
	{
	  partName: "Arduino UNO",
	  partPurchaseURL: "https://docs.arduino.cc/hardware/uno-rev3/",
	  projectId: 10,
	},
	{
	  partName: "DC Motor, 12 V",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256806832691475.html?src=google&pdp_npi=4%40dis%21USD%211.33%211.33%21%21%21%21%21%40%2112000039098256545%21ppc%21%21%21&src=google&albch=shopping&acnt=708-803-3821&isdl=y&slnk=&plac=&mtctp=&albbt=Google_7_shopping&aff_platform=google&aff_short_key=UneMJZVf&gclsrc=aw.ds&albagn=888888&ds_e_adid=&ds_e_matchtype=&ds_e_device=c&ds_e_network=x&ds_e_product_group_id=&ds_e_product_id=en3256806832691475&ds_e_product_merchant_id=5549986406&ds_e_product_country=US&ds_e_product_language=en&ds_e_product_channel=online&ds_e_product_store_id=&ds_url_v=2&albcp=20542171673&albag=&isSmbAutoCall=false&needSmbHouyi=false&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzoal1YXmRgHYINORMome2tdK6bvt8GmiAZILxFJzDbzmhieJTfSF-4aAgQNEALw_wcB&gatewayAdapt=glo2usa",
	  projectId: 10,
	},
	{
	  partName: "L298N H-Bridge",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/2251832206459537.html?src=google&pdp_npi=4%40dis%21USD%211.59%211.59%21%21%21%21%21%40%2157692613834%21ppc%21%21%21&src=google&albch=shopping&acnt=708-803-3821&isdl=y&slnk=&plac=&mtctp=&albbt=Google_7_shopping&aff_platform=google&aff_short_key=UneMJZVf&gclsrc=aw.ds&albagn=888888&ds_e_adid=&ds_e_matchtype=&ds_e_device=c&ds_e_network=x&ds_e_product_group_id=&ds_e_product_id=en2251832206459537&ds_e_product_merchant_id=107683874&ds_e_product_country=US&ds_e_product_language=en&ds_e_product_channel=online&ds_e_product_store_id=&ds_url_v=2&albcp=19686377402&albag=&isSmbAutoCall=false&needSmbHouyi=false&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzqw_X2XunKZdUCrFtCoH_B9ZZoxlhRzwX6_Jgi-3JVFkBIYUdKgpy0aAuapEALw_wcB&gatewayAdapt=glo2usa",
	  projectId: 10,
	},
	{
	  partName: "Jumper wires (generic)",
	  partPurchaseURL: "https://www.sparkfun.com/jumper-wires-standard-7-m-m-30-awg-30-pack.html",
	  projectId: 10,
	},
	{ partName: "9V battery (generic)", projectId: 10 },
	{
	  partName: "Maker Essentials - Micro-motors & Grippy Wheels",
	  partPurchaseURL:
		"https://shop.pimoroni.com/products/maker-essentials-micro-motors-grippy-wheels?variant=1418711662602",
	  projectId: 10,
	},
  
	{
	  partName: "DHT22 Digital Temperature & Humidity Sensor",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/2251832572843806.html?aff_fcid=fd3eabaf5510476187de5ca270b39907-1742061894812-00929-Ei3oSbq&aff_fsk=Ei3oSbq&aff_platform=link-c-tool&sk=Ei3oSbq&aff_trace_key=fd3eabaf5510476187de5ca270b39907-1742061894812-00929-Ei3oSbq&terminal_id=01474781c04c4c0ebf9de4fb38594320&gatewayAdapt=glo2usa4itemAdapt",
	  projectId: 11,
	},
	{
	  partName: "Breadboard",
	  partPurchaseURL:
		"https://www.amazon.com/BB400-Solderless-Plug-BreadBoard-tie-points/dp/B0040Z1ERO?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A2RKGEIGG4B1JT&gQT=1https://www.amazon.com/BB400-Solderless-Plug-BreadBoard-tie-points/dp/B0040Z1ERO?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A2RKGEIGG4B1JT&gQT=1",
	  projectId: 11,
	},
	{
	  partName: "Arduino MKR WiFi 1010",
	  partPurchaseURL: "https://store.arduino.cc/products/arduino-mkr-wifi-1010",
	  projectId: 11,
	},
	{
	  partName: "Pack of 50 female-female jumper wires in various colors",
	  partPurchaseURL:
		"https://store.arduino.cc/products/pack-of-50-female-female-jumper-wires-in-various-colors",
	  projectId: 11,
	},
  
	{
	  partName: "Arduino® UNO R4 WiFi",
	  partPurchaseURL: "https://store.arduino.cc/products/uno-r4-wifi",
	  projectId: 12,
	},
	{
	  partName: "LIS3DH Triple-Axis Accelerometer",
	  partPurchaseURL: "https://www.adafruit.com/product/2809",
	  projectId: 12,
	},
  
	{
	  partName: "16x2 LCD display with I²C interface",
	  partPurchaseURL: "https://store.arduino.cc/products/16x2-lcd-display-with-i-c-interface",
	  projectId: 13,
	},
	{
	  partName: "HC-SR501",
	  partPurchaseURL:
		"https://www.amazon.com/HiLetgo-HC-SR501-Infrared-Sensor-Arduino/dp/B07KZW86YR/ref=sr_1_1_sspa?crid=5IPLTCOCVFST&dib=eyJ2IjoiMSJ9.CU24MZyMTi4rvRipNoH1TxxcDzDf27PdS8r1oNueQKHgvvegpAr0Q1PEMWQKLcpBpyCSkTdFpWD9D9M4A71say9WtbsG8Fxv5TwM8zSaUfMZvazcZvX_rdRivq-FWHLeFisVOf-zgIvDtlskNfp9N1jBlPAuoWN3FJSV4kj-dzGmPvqEaGPNpt59Xvfg4XwkUCTlE59Xgy_ovbDq2EQSD3Otq_DQjp9wnxQKeuE--5o.5Y95ySgs3N8NEkkg5gjb0vetkcgLgo7ysRymNHAgfdM&dib_tag=se&keywords=hc-sr501+pir+motion+sensor&qid=1715173600&sprefix=HC-SR501+%2Caps%2C366&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
	  projectId: 13,
	},
	{
	  partName: "Arduino Uno Rev3",
	  partPurchaseURL: "https://store.arduino.cc/products/arduino-uno-rev3",
	  projectId: 13,
	},
	{
	  partName: "Breadboard Jumper Wire Pack (200mm&100mm)",
	  partPurchaseURL: "https://store.arduino.cc/products/breadboard-jumper-wire-pack-200mm-100mm",
	  projectId: 13,
	},
	{
	  partName: "Breadboard - 830 contacts",
	  partPurchaseURL: "https://store.arduino.cc/products/breadboard-830-contacts",
	  projectId: 13,
	},
	{
	  partName: "Resistor 220 Ohm",
	  partPurchaseURL: "https://www.adafruit.com/product/2780",
	  projectId: 13,
	},
  
	{
	  partName: "Breadboard 170 pins",
	  partPurchaseURL:
		"https://www.newark.com/pro-signal/psg-bb-170w/breadboard-solderless-plastic/dp/71Y9231?st=breadboard%20170",
	  projectId: 14,
	},
	{
	  partName: "Arduino Nano Every",
	  partPurchaseURL: "https://store.arduino.cc/products/arduino-nano-every",
	  projectId: 14,
	},
	{
	  partName: "Ultrasonic Sensor - HC-SR04",
	  partPurchaseURL:
		"https://www.getfpv.com/hc-sr04-ultrasonic-distance-sensor-module.html?utm_source=google&utm_medium=cpc&utm_campaign=DM+-+NB+-+PMax+-+Shop+-+No-index+-+SM+-+ALL+%7C+Full+Funnel&utm_content=pmax_x&utm_keyword=&utm_matchtype=&campaign_id=20799936859&network=x&device=c&gc_id=20799936859&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzqnJAOnL05JbJpC0Jw2XujdW7dTMosBd1ad3ZhnWen5NDEhkUp-SrEaAlOqEALw_wcB",
	  projectId: 14,
	},
	{ partName: "double sided tape", projectId: 14 },
	{
	  partName: "SG90 Micro Servo",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/3256806830987313.html?src=google&pdp_npi=4%40dis%21USD%211.92%211.92%21%21%21%21%21%40%2112000039086050672%21ppc%21%21%21&src=google&albch=shopping&acnt=708-803-3821&isdl=y&slnk=&plac=&mtctp=&albbt=Google_7_shopping&aff_platform=google&aff_short_key=UneMJZVf&gclsrc=aw.ds&albagn=888888&ds_e_adid=&ds_e_matchtype=&ds_e_device=c&ds_e_network=x&ds_e_product_group_id=&ds_e_product_id=en3256806830987313&ds_e_product_merchant_id=5308142485&ds_e_product_country=US&ds_e_product_language=en&ds_e_product_channel=online&ds_e_product_store_id=&ds_url_v=2&albcp=20542171673&albag=&isSmbAutoCall=false&needSmbHouyi=false&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzroaXGQEM6F1DxdRgZzKQpDJTdzfdnIyZdoNE9AWKsFAYkDxKq0sIAaAphgEALw_wcB&gatewayAdapt=glo2usa",
	  projectId: 14,
	},
  
	{
	  partName: "DHT11 Temperature Sensor",
	  partPurchaseURL:
		"https://www.robotshop.com/products/dht11-temperature-humidity-sensor-module-breakout?gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzop70Zzx0dmNOi2gkUAeMAb6vyBCtPZWG4xCQWCb6JrUQeTaXMbvskaAuUBEALw_wcB",
	  projectId: 2,
	},
	{
	  partName: "Jumper wires (generic)",
	  partPurchaseURL: "https://www.sparkfun.com/jumper-wires-standard-7-m-m-30-awg-30-pack.html",
	  projectId: 2,
	},
	{
	  partName: "Arduino UNO",
	  partPurchaseURL: "https://docs.arduino.cc/hardware/uno-rev3/",
	  projectId: 2,
	},
	{
	  partName: "Breadboard (generic)",
	  partPurchaseURL: "https://www.sparkfun.com/breadboard-self-adhesive-white.html",
	  projectId: 2,
	},
	{ partName: "Arduino uno Board", projectId: 16 },
	{
	  partName: "Ultrasonic Sensor - HC-SR04",
	  partPurchaseURL:
		"https://www.getfpv.com/hc-sr04-ultrasonic-distance-sensor-module.html?utm_source=google&utm_medium=cpc&utm_campaign=DM+-+NB+-+PMax+-+Shop+-+No-index+-+SM+-+ALL+%7C+Full+Funnel&utm_content=pmax_x&utm_keyword=&utm_matchtype=&campaign_id=20799936859&network=x&device=c&gc_id=20799936859&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzqOHLBGMxeSPdZwF49VoLEACKMJMXfpzqtyyYik9vFeGhGh2wDwL1YaAv16EALw_wcB",
	  projectId: 16,
	},
	{ partName: "Active Buzzer 5V (HXD)", projectId: 16 },
	{ partName: "Breadboard 100x160", projectId: 16 },
	{
	  partName: "jumper wires for arduino",
	  partPurchaseURL:
		"https://www.digikey.com/en/products/detail/bud-industries/BC-32670/5291564?gclsrc=aw.ds&&utm_adgroup=General&utm_source=google&utm_medium=cpc&utm_campaign=PMax%20Shopping_Supplier_Bud%20Industries_0377_Co-op&utm_term=&utm_content=General&utm_id=go_cmp-20504612364_adg-_ad-__dev-c_ext-_prd-5291564_sig-Cj0KCQjwytS-BhCKARIsAMGJyzqLvvbQELmo8BjdG7oySp4luEfLF_0n7n90gYY4HjMNrgo24di68zcaArvsEALw_wcB&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzqLvvbQELmo8BjdG7oySp4luEfLF_0n7n90gYY4HjMNrgo24di68zcaArvsEALw_wcB&gclsrc=aw.ds",
	  projectId: 16,
	},
  
	{
	  partName: "SparkFun Soil Moisture Sensor (with Screw Terminals)",
	  partPurchaseURL:
		"https://www.sparkfun.com/sparkfun-soil-moisture-sensor-with-screw-terminals.html",
	  projectId: 17,
	},
	{
	  partName: "Buzzer",
	  partPurchaseURL:
		"https://www.aliexpress.us/item/2251832554216202.html?src=google&pdp_npi=4%40dis%21USD%210.20%210.14%21%21%21%21%21%40%2161587752265%21ppc%21%21%21&src=google&albch=shopping&acnt=708-803-3821&isdl=y&slnk=&plac=&mtctp=&albbt=Google_7_shopping&aff_platform=google&aff_short_key=UneMJZVf&gclsrc=aw.ds&albagn=888888&ds_e_adid=&ds_e_matchtype=&ds_e_device=c&ds_e_network=x&ds_e_product_group_id=&ds_e_product_id=en2251832554216202&ds_e_product_merchant_id=107160712&ds_e_product_country=US&ds_e_product_language=en&ds_e_product_channel=online&ds_e_product_store_id=&ds_url_v=2&albcp=20542171673&albag=&isSmbAutoCall=false&needSmbHouyi=false&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzqVhhjLA2B1RJ0nsqAnhX64b7_ALdmhDTgsMC-QL89EL7EEv9IUHOwaAtQ7EALw_wcB&gatewayAdapt=glo2usa",
	  projectId: 17,
	},
	{ partName: "9V battery (generic)", projectId: 17 },
	{
	  partName: "Jumper wires (generic)",
	  partPurchaseURL: "https://www.sparkfun.com/jumper-wires-standard-7-m-m-30-awg-30-pack.html",
	  projectId: 17,
	},
	{ partName: "Resistor 220 ohm", projectId: 17 },
	{
	  partName: "Mini Breadboard",
	  partPurchaseURL:
		"https://www.jaycar.com.au/arduino-compatible-mini-breadboard-with-170-tie-points/p/PB8817",
	  projectId: 17,
	},
	{
	  partName: "10 mm Heat Shrink",
	  partPurchaseURL: "https://www.jaycar.com.au/10mm-black-heatshrink-tubing/p/WH5535",
	  projectId: 17,
	},
	{
	  partName: "9V Battery Clip",
	  partPurchaseURL: "https://octopart.com/233-keystone-20415",
	  projectId: 17,
	},
  
	{
	  partName: "M5Stack ATOM Lite",
	  partPurchaseURL:
		"https://www.amazon.com/M5Stack-Official-Compact-ESP32-Development/dp/B0D6LDXRJ4",
	  projectId: 18,
	},
  ]

  const partsForForkedProjects = [
	// fork of project with id 1
	{
	  partName: "RGB Diffused Common Anode",
	  partPurchaseURL:
		"https://www.switchelectronics.co.uk/products/rgb-5mm-led-common-anode?currency=GBP&variant=45356647678261&utm_source=google&utm_medium=cpc&utm_campaign=Google%20Shopping&stkn=bbf1d20e1ed7&srsltid=AfmBOordsEaTCMF3J6-AfcD8vk8QcPcC4K0zzVISH52cC488Kxe1qaONR70",
	  projectId: 19,
	},
	{
	  partName: "RGB Diffused Common Cathode",
	  partPurchaseURL:
		"https://www.digikey.com/en/products/detail/kingbright/WP154A4SUREQBFZGC/3084119?gclsrc=aw.ds&&utm_adgroup=&utm_source=google&utm_medium=cpc&utm_campaign=PMax%20Shopping_Product_Medium%20ROAS%20Categories&utm_term=&utm_content=&utm_id=go_cmp-20223376311_adg-_ad-__dev-c_ext-_prd-3084119_sig-Cj0KCQjwytS-BhCKARIsAMGJyzrndzRh4UpTxjP3dwh6qtEhRVr52As-iIISKbIm8my87wMmszzNOGQaApWuEALw_wcB&gad_source=4&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzrndzRh4UpTxjP3dwh6qtEhRVr52As-iIISKbIm8my87wMmszzNOGQaApWuEALw_wcB&gclsrc=aw.ds",
	  projectId: 19,
	},
	{
	  partName: "Push Button",
	  partPurchaseURL:
		"https://www.digikey.com/en/products/detail/omron-electronics-inc-emc-div/B3F-1020/44059?gclsrc=aw.ds&&utm_adgroup=General&utm_source=google&utm_medium=cpc&utm_campaign=PMax%20Shopping_Supplier_Omron%20EMC_0039_Co-op&utm_term=&utm_content=General&utm_id=go_cmp-20514527677_adg-_ad-__dev-c_ext-_prd-44059_sig-Cj0KCQjwytS-BhCKARIsAMGJyzrr-5qjOkI9MLkTB9T9_A1Ty7sZzB8-mi8EFJGE-bBRohZJDij9el4aAsHhEALw_wcB&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzrr-5qjOkI9MLkTB9T9_A1Ty7sZzB8-mi8EFJGE-bBRohZJDij9el4aAsHhEALw_wcB&gclsrc=aw.ds",
	  projectId: 19,
	},
	{
	  partName: "Arduino UNO",
	  partPurchaseURL:
		"https://www.amazon.com/Arduino-A000066-ARDUINO-UNO-R3/dp/B008GRTSV6/ref=sr_1_1?dib=eyJ2IjoiMSJ9.MazmhFfn-DF8W5oyX_S-tOEIL3Mn9mSmjkjyDbHeCT06bz8eyqHpr8DjfILgxn8h3AezZ0AWO4gHNvPcSbcqnN6J4BznSJSg3uvZD5EQ-B4Pnd6tSKtk8jTXFNQSUhEW4QATVOYIgL8vPnz1GzYsudrN0tgiJ-GI1qeUgYahF0re-bvcT-r1zcE3wXoPBm1a-L5KNnHMjr0Fk0dB8H6q_0Vx79X5Msm4zzOeGLpSSgQ.xH6ic01UZP3NN0Mbe0wF7ObzOpubdw3EcRFSVeilpWg&dib_tag=se&hvadid=557574772208&hvdev=c&hvlocphy=9007851&hvnetw=g&hvqmt=e&hvrand=8349769826119925036&hvtargid=kwd-20840843967&hydadcr=2549_13510196&keywords=arduino+uno&mcid=161b3bd4228c3f91b7717f7227e9e546&qid=1742058541&sr=8-1",
	  projectId: 19,
	},
	{
	  partName: "Breadboard (generic)",
	  partPurchaseURL:
		"https://www.amazon.com/BB400-Solderless-Plug-BreadBoard-tie-points/dp/B0040Z1ERO/ref=asc_df_B0040Z1ERO?mcid=8537ae394369376cb9c2a9371b24205e&hvocijid=1054439975421447010-B0040Z1ERO-&hvexpln=73&tag=hyprod-20&linkCode=df0&hvadid=721245378154&hvpos=&hvnetw=g&hvrand=1054439975421447010&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9007851&hvtargid=pla-2281435179738&psc=1",
	  projectId: 19,
	},
	{
	  partName: "Jumper wires (generic)",
	  partPurchaseURL:
		"https://www.digikey.com/en/products/detail/bud-industries/BC-32670/5291564?gclsrc=aw.ds&&utm_adgroup=General&utm_source=google&utm_medium=cpc&utm_campaign=PMax%20Shopping_Supplier_Bud%20Industries_0377_Co-op&utm_term=&utm_content=General&utm_id=go_cmp-20504612364_adg-_ad-__dev-c_ext-_prd-5291564_sig-Cj0KCQjwytS-BhCKARIsAMGJyzrX-guhy8ANn1zwXlmm-GungnGqmVNIKpa3JQUiKOfWCoRp-hqEzMYaAirCEALw_wcB&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzrX-guhy8ANn1zwXlmm-GungnGqmVNIKpa3JQUiKOfWCoRp-hqEzMYaAirCEALw_wcB&gclsrc=aw.ds",
	  projectId: 19,
	},
	{
	  partName: "Resistor 220 ohm",
	  partPurchaseURL:
		"https://www.digikey.com/en/products/detail/stackpole-electronics-inc/CF14JT220R/1830334?gclsrc=aw.ds&&utm_adgroup=&utm_source=google&utm_medium=cpc&utm_campaign=Pmax_Shopping_Stackpole_0738_Co-op&utm_term=&utm_content=&utm_id=go_cmp-20688992636_adg-_ad-__dev-c_ext-_prd-1830334_sig-Cj0KCQjwytS-BhCKARIsAMGJyzq0MwABmqOkz69zNnfOpGha_N2hsSfe0YB44Mb9w-ORfqpGfpIxnYIaAgl8EALw_wcB&gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzq0MwABmqOkz69zNnfOpGha_N2hsSfe0YB44Mb9w-ORfqpGfpIxnYIaAgl8EALw_wcB&gclsrc=aw.ds",
	  projectId: 19,
	},
	//fork of project with id 2
	{
	  partName: "DHT11 Temperature Sensor",
	  partPurchaseURL:
		"https://www.robotshop.com/products/dht11-temperature-humidity-sensor-module-breakout?gad_source=1&gclid=Cj0KCQjwytS-BhCKARIsAMGJyzop70Zzx0dmNOi2gkUAeMAb6vyBCtPZWG4xCQWCb6JrUQeTaXMbvskaAuUBEALw_wcB",
	  projectId: 20,
	},
	{
	  partName: "Jumper wires (generic)",
	  partPurchaseURL: "https://www.sparkfun.com/jumper-wires-standard-7-m-m-30-awg-30-pack.html",
	  projectId: 20,
	},
	{
	  partName: "Arduino UNO",
	  partPurchaseURL: "https://docs.arduino.cc/hardware/uno-rev3/",
	  projectId: 20,
	},
	{
	  partName: "Breadboard (generic)",
	  partPurchaseURL: "https://www.sparkfun.com/breadboard-self-adhesive-white.html",
	  projectId: 20,
	},
	{
	  partName: "0.96-inch OLED Display (128x64 pixels, I2C interface)",
	  partPurchaseURL:
		"https://www.amazon.com/HiLetgo-Serial-128X64-Display-Color/dp/B06XRBYJR8/ref=asc_df_B06XRBYJR8?mcid=1888c23ac29939dbac707838484efd9d&hvocijid=13755204498935906391-B06XRBYJR8-&hvexpln=73&tag=hyprod-20&linkCode=df0&hvadid=721245378154&hvpos=&hvnetw=g&hvrand=13755204498935906391&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9007851&hvtargid=pla-2281435178098&th=1",
	  projectId: 20,
	},
  ]

  