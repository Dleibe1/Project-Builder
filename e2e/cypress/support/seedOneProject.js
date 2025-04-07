/// <reference types="Cypress" />

import allowedTags from "../../../shared/allowedTags"
import projectCodeSeedData from "../../../server/src/db/ProjectSeederData/projectCodeSeedData"
import projectDescriptionsSeedData from "../../../server/src/db/ProjectSeederData/projectDescriptionsSeedData"
import projectInstructionsSeedData from "../../../server/src/db/ProjectSeederData/projectInstructionsSeedData"

const projectTags = [
  { projectId: 1, tagId: 2 },
  { projectId: 1, tagId: 24 },
  { projectId: 1, tagId: 12 },
]

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
]
const project = {
  userId: 1,
  title: "Interfacing RGB Led with Arduino",
  description: projectDescriptionsSeedData[0],
  appsAndPlatforms: "Arduino IDE",
  code: projectCodeSeedData[13],
  thumbnailImage: "/images/projectSeeder/project001/thumbnail.blob",
  instructions: projectInstructionsSeedData[0],
}
/**
 * Seeds a project into the database by truncating tables and inserting test data.
 *
 * @param {string} userFixture - The filename for the user fixture.  See cy.fixture() in Cypress docs.
 * @returns {Cypress.Chainable<any>} A chainable Cypress context.
 */
const seedOneProject = (userFixture) => {
  return cy
    .task("db:truncate", ["User", "Project", "Part", "Tag"])
    .task("dbTable:truncate", "project_tags")
    .then(() => {
      cy.fixture(userFixture)
    })
    .then((userData) => {
      return cy.task("db:insert", {
        modelName: "User",
        json: userData,
      })
    })
    .then(() => {
      return cy.task("db:insert", {
        modelName: "Project",
        json: project,
      })
    })
    .then(() => {
      return cy.task("db:insert", {
        modelName: "Part",
        json: parts,
      })
    })
    .then(() => {
      return cy.task("db:insert", {
        modelName: "Tag",
        json: allowedTags,
      })
    })
    .then(() => {
      return cy.task("dbTable:insert", {
        tableName: "project_tags",
        json: projectTags,
      })
    })
}

export default seedOneProject
