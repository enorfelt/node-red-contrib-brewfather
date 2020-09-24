const batchSchema = [
    "_archived",
    "_created",
    "_created._nanoseconds",
    "_created._seconds",
    "_id",
    "_rev",
    "_timestamp",
    "_timestamp._nanoseconds",
    "_timestamp._seconds",
    "_timestamp_ms",
    "_type",
    "_version",
    "batchFermentables",
    "batchFermentables",
    "batchFermentables._id",
    "batchFermentables.amount",
    "batchFermentables.attenuation",
    "batchFermentables.checked",
    "batchFermentables.color",
    "batchFermentables.costPerAmount",
    "batchFermentables.displayAmount",
    "batchFermentables.ibuPerAmount",
    "batchFermentables.inventory",
    "batchFermentables.name",
    "batchFermentables.notFermentable",
    "batchFermentables.notInRecipe",
    "batchFermentables.notes",
    "batchFermentables.origin",
    "batchFermentables.potential",
    "batchFermentables.potentialPercentage",
    "batchFermentables.removedAmount",
    "batchFermentables.removedFromInventory",
    "batchFermentables.supplier",
    "batchFermentables.totalCost",
    "batchFermentables.type",
    "batchFermentablesLocal",
    "batchHops",
    "batchHops",
    "batchHops._id",
    "batchHops.alpha",
    "batchHops.amount",
    "batchHops.costPerAmount",
    "batchHops.displayAmount",
    "batchHops.inventory",
    "batchHops.name",
    "batchHops.notInRecipe",
    "batchHops.origin",
    "batchHops.totalCost",
    "batchHops.type",
    "batchHops.usage",
    "batchHopsLocal",
    "batchMiscs",
    "batchMiscs",
    "batchMiscs._created",
    "batchMiscs._created._nanoseconds",
    "batchMiscs._created._seconds",
    "batchMiscs._id",
    "batchMiscs._rev",
    "batchMiscs._timestamp",
    "batchMiscs._timestamp._nanoseconds",
    "batchMiscs._timestamp._seconds",
    "batchMiscs._timestamp_ms",
    "batchMiscs._version",
    "batchMiscs.amount",
    "batchMiscs.amountPerL",
    "batchMiscs.costPerAmount",
    "batchMiscs.displayAmount",
    "batchMiscs.inventory",
    "batchMiscs.inventoryUnit",
    "batchMiscs.name",
    "batchMiscs.notInRecipe",
    "batchMiscs.notes",
    "batchMiscs.substitutes",
    "batchMiscs.time",
    "batchMiscs.timeIsDays",
    "batchMiscs.totalCost",
    "batchMiscs.type",
    "batchMiscs.unit",
    "batchMiscs.use",
    "batchMiscs.userNotes",
    "batchMiscs.waterAdjustment",
    "batchMiscsLocal",
    "batchNo",
    "batchYeasts",
    "batchYeasts",
    "batchYeasts._id",
    "batchYeasts.amount",
    "batchYeasts.attenuation",
    "batchYeasts.costPerAmount",
    "batchYeasts.description",
    "batchYeasts.displayAmount",
    "batchYeasts.fermentsAll",
    "batchYeasts.flocculation",
    "batchYeasts.form",
    "batchYeasts.inventory",
    "batchYeasts.inventoryUnit",
    "batchYeasts.laboratory",
    "batchYeasts.maxAbv",
    "batchYeasts.maxAttenuation",
    "batchYeasts.maxTemp",
    "batchYeasts.minAttenuation",
    "batchYeasts.minTemp",
    "batchYeasts.name",
    "batchYeasts.notInRecipe",
    "batchYeasts.productId",
    "batchYeasts.totalCost",
    "batchYeasts.type",
    "batchYeasts.unit",
    "batchYeastsLocal",
    "boilSteps",
    "boilSteps",
    "boilSteps.name",
    "boilSteps.time",
    "boilStepsCount",
    "bottlingDate",
    "brewControllerEnabled",
    "brewDate",
    "brewer",
    "carbonationForce",
    "carbonationType",
    "cost",
    "cost.fermentables",
    "cost.fermentablesShare",
    "cost.hops",
    "cost.hopsShare",
    "cost.miscs",
    "cost.miscsShare",
    "cost.perBottlingLiter",
    "cost.total",
    "cost.yeasts",
    "cost.yeastsShare",
    "devices",
    "devices.brewPiLess",
    "devices.brewPiLess.enabled",
    "devices.brewPiLess.items",
    "devices.iSpindel",
    "devices.iSpindel.enabled",
    "devices.iSpindel.items",
    "devices.myBrewbot",
    "devices.myBrewbot.enabled",
    "devices.myBrewbot.items",
    "devices.plaatoAirlock",
    "devices.plaatoAirlock.enabled",
    "devices.plaatoAirlock.items",
    "devices.plaatoKeg",
    "devices.plaatoKeg.enabled",
    "devices.plaatoKeg.items",
    "devices.smartPid",
    "devices.smartPid.brewDeviceId",
    "devices.smartPid.enabled",
    "devices.smartPid.items",
    "devices.stream",
    "devices.stream.enabled",
    "devices.stream.items",
    "devices.tilt",
    "devices.tilt.enabled",
    "devices.tilt.gravity",
    "devices.tilt.items",
    "devices.tilt.mode",
    "devices.tilt.temp",
    "estimatedBuGuRatio",
    "estimatedColor",
    "estimatedFg",
    "estimatedIbu",
    "estimatedOg",
    "estimatedRbRatio",
    "fermentationControllerEnabled",
    "fermentationStartDate",
    "mashStepsCount",
    "measuredAbv",
    "measuredAttenuation",
    "measuredConversionEfficiency",
    "measuredEfficiency",
    "measuredKettleEfficiency",
    "measuredMashEfficiency",
    "measurements",
    "name",
    "notes",
    "primingSugarEquiv",
    "recipe",
    "recipe._created",
    "recipe._created._nanoseconds",
    "recipe._created._seconds",
    "recipe._id",
    "recipe._public",
    "recipe._rev",
    "recipe._timestamp",
    "recipe._timestamp._nanoseconds",
    "recipe._timestamp._seconds",
    "recipe._timestamp_ms",
    "recipe._type",
    "recipe._uid",
    "recipe._version",
    "recipe.abv",
    "recipe.attenuation",
    "recipe.author",
    "recipe.avgWeightedHopstandTemp",
    "recipe.batchSize",
    "recipe.boilSize",
    "recipe.boilTime",
    "recipe.buGuRatio",
    "recipe.carbonation",
    "recipe.carbonationStyle",
    "recipe.color",
    "recipe.data",
    "recipe.data.hltWaterAmount",
    "recipe.data.hopsAmount",
    "recipe.data.mashFermentables",
    "recipe.data.mashFermentables",
    "recipe.data.mashFermentables._id",
    "recipe.data.mashFermentables.amount",
    "recipe.data.mashFermentables.attenuation",
    "recipe.data.mashFermentables.color",
    "recipe.data.mashFermentables.grainCategory",
    "recipe.data.mashFermentables.name",
    "recipe.data.mashFermentables.notFermentable",
    "recipe.data.mashFermentables.notes",
    "recipe.data.mashFermentables.origin",
    "recipe.data.mashFermentables.percentage",
    "recipe.data.mashFermentables.potential",
    "recipe.data.mashFermentables.potentialPercentage",
    "recipe.data.mashFermentables.supplier",
    "recipe.data.mashFermentables.type",
    "recipe.data.mashFermentablesAmount",
    "recipe.data.mashVolume",
    "recipe.data.mashVolumeSurplus",
    "recipe.data.mashWaterAmount",
    "recipe.data.otherFermentables",
    "recipe.data.otherFermentablesAmount",
    "recipe.data.spargeWaterAmount",
    "recipe.data.strikeTemp",
    "recipe.data.topUpWater",
    "recipe.data.totalWaterAmount",
    "recipe.efficiency",
    "recipe.equipment",
    "recipe.equipment._created",
    "recipe.equipment._created._nanoseconds",
    "recipe.equipment._created._seconds",
    "recipe.equipment._id",
    "recipe.equipment._rev",
    "recipe.equipment._timestamp",
    "recipe.equipment._timestamp._nanoseconds",
    "recipe.equipment._timestamp._seconds",
    "recipe.equipment._timestamp_ms",
    "recipe.equipment._version",
    "recipe.equipment.altitude",
    "recipe.equipment.altitudeAdjustment",
    "recipe.equipment.ambientTemperature",
    "recipe.equipment.aromaHopUtilization",
    "recipe.equipment.batchSize",
    "recipe.equipment.boilOffPerHr",
    "recipe.equipment.boilSize",
    "recipe.equipment.boilTemp",
    "recipe.equipment.boilTime",
    "recipe.equipment.bottlingVolume",
    "recipe.equipment.calcAromaHopUtilization",
    "recipe.equipment.calcBoilVolume",
    "recipe.equipment.calcMashEfficiency",
    "recipe.equipment.calcStrikeWaterTemperature",
    "recipe.equipment.createdAt",
    "recipe.equipment.createdAt._nanoseconds",
    "recipe.equipment.createdAt._seconds",
    "recipe.equipment.efficiency",
    "recipe.equipment.efficiencyType",
    "recipe.equipment.evaporationRate",
    "recipe.equipment.fermenterLoss",
    "recipe.equipment.fermenterLossEstimate",
    "recipe.equipment.fermenterVolume",
    "recipe.equipment.fermenterVolumeBeforeTopUp",
    "recipe.equipment.grainTemperature",
    "recipe.equipment.hltWaterMin",
    "recipe.equipment.hopUtilization",
    "recipe.equipment.hopstandTemperature",
    "recipe.equipment.mashEfficiency",
    "recipe.equipment.mashTunDeadSpace",
    "recipe.equipment.mashTunHeatCapacity",
    "recipe.equipment.mashTunLoss",
    "recipe.equipment.mashWaterFormula",
    "recipe.equipment.mashWaterMax",
    "recipe.equipment.mashWaterVolumeLimitEnabled",
    "recipe.equipment.name",
    "recipe.equipment.notes",
    "recipe.equipment.postBoilKettleVol",
    "recipe.equipment.spargeWaterFormula",
    "recipe.equipment.spargeWaterMin",
    "recipe.equipment.spargeWaterOverflow",
    "recipe.equipment.spargeWaterReminderEnabled",
    "recipe.equipment.trubChillerLoss",
    "recipe.equipment.waterCalculation",
    "recipe.equipment.whirlpoolTime",
    "recipe.fermentableIbu",
    "recipe.fermentables",
    "recipe.fermentables",
    "recipe.fermentables._id",
    "recipe.fermentables.amount",
    "recipe.fermentables.attenuation",
    "recipe.fermentables.color",
    "recipe.fermentables.grainCategory",
    "recipe.fermentables.name",
    "recipe.fermentables.notFermentable",
    "recipe.fermentables.notes",
    "recipe.fermentables.origin",
    "recipe.fermentables.percentage",
    "recipe.fermentables.potential",
    "recipe.fermentables.potentialPercentage",
    "recipe.fermentables.supplier",
    "recipe.fermentables.type",
    "recipe.fermentablesTotalAmount",
    "recipe.fermentation",
    "recipe.fermentation._created",
    "recipe.fermentation._created._nanoseconds",
    "recipe.fermentation._created._seconds",
    "recipe.fermentation._id",
    "recipe.fermentation._timestamp",
    "recipe.fermentation._timestamp._nanoseconds",
    "recipe.fermentation._timestamp._seconds",
    "recipe.fermentation.name",
    "recipe.fermentation.steps",
    "recipe.fermentation.steps",
    "recipe.fermentation.steps.displayStepTemp",
    "recipe.fermentation.steps.stepTemp",
    "recipe.fermentation.steps.stepTime",
    "recipe.fermentation.steps.type",
    "recipe.fg",
    "recipe.fgEstimated",
    "recipe.fgFormula",
    "recipe.firstWortGravity",
    "recipe.hopStandMinutes",
    "recipe.hops",
    "recipe.hops",
    "recipe.hops._editFlag",
    "recipe.hops._id",
    "recipe.hops.alpha",
    "recipe.hops.amount",
    "recipe.hops.ibu",
    "recipe.hops.name",
    "recipe.hops.origin",
    "recipe.hops.time",
    "recipe.hops.type",
    "recipe.hops.usage",
    "recipe.hops.use",
    "recipe.hopsTotalAmount",
    "recipe.ibu",
    "recipe.ibuFormula",
    "recipe.manualFg",
    "recipe.mash",
    "recipe.mash._id",
    "recipe.mash.name",
    "recipe.mash.steps",
    "recipe.mash.steps",
    "recipe.mash.steps.displayStepTemp",
    "recipe.mash.steps.name",
    "recipe.mash.steps.rampTime",
    "recipe.mash.steps.stepTemp",
    "recipe.mash.steps.stepTime",
    "recipe.mash.steps.type",
    "recipe.mashEfficiency",
    "recipe.miscs",
    "recipe.miscs",
    "recipe.miscs._created",
    "recipe.miscs._created._nanoseconds",
    "recipe.miscs._created._seconds",
    "recipe.miscs._id",
    "recipe.miscs._rev",
    "recipe.miscs._timestamp",
    "recipe.miscs._timestamp._nanoseconds",
    "recipe.miscs._timestamp._seconds",
    "recipe.miscs._timestamp_ms",
    "recipe.miscs._version",
    "recipe.miscs.amount",
    "recipe.miscs.amountPerL",
    "recipe.miscs.costPerAmount",
    "recipe.miscs.inventory",
    "recipe.miscs.name",
    "recipe.miscs.notes",
    "recipe.miscs.substitutes",
    "recipe.miscs.time",
    "recipe.miscs.type",
    "recipe.miscs.unit",
    "recipe.miscs.use",
    "recipe.miscs.userNotes",
    "recipe.name",
    "recipe.notes",
    "recipe.nutrition",
    "recipe.nutrition.calories",
    "recipe.nutrition.calories.alcohol",
    "recipe.nutrition.calories.carbs",
    "recipe.nutrition.calories.kJ",
    "recipe.nutrition.calories.total",
    "recipe.nutrition.carbs",
    "recipe.nutrition.carbs.total",
    "recipe.og",
    "recipe.ogPlato",
    "recipe.origin",
    "recipe.path",
    "recipe.postBoilGravity",
    "recipe.preBoilGravity",
    "recipe.primaryTemp",
    "recipe.rbRatio",
    "recipe.searchTags",
    "recipe.searchTags",
    "recipe.style",
    "recipe.style._id",
    "recipe.style.abvMax",
    "recipe.style.abvMin",
    "recipe.style.buGuMax",
    "recipe.style.buGuMin",
    "recipe.style.carbMax",
    "recipe.style.carbMin",
    "recipe.style.carbonationStyle",
    "recipe.style.category",
    "recipe.style.categoryNumber",
    "recipe.style.colorMax",
    "recipe.style.colorMin",
    "recipe.style.fgMax",
    "recipe.style.fgMin",
    "recipe.style.ibuMax",
    "recipe.style.ibuMin",
    "recipe.style.lovibondMax",
    "recipe.style.lovibondMin",
    "recipe.style.name",
    "recipe.style.ogMax",
    "recipe.style.ogMin",
    "recipe.style.rbrMax",
    "recipe.style.rbrMin",
    "recipe.style.styleGuide",
    "recipe.style.styleLetter",
    "recipe.style.type",
    "recipe.styleAbv",
    "recipe.styleBuGu",
    "recipe.styleColor",
    "recipe.styleConformity",
    "recipe.styleFg",
    "recipe.styleIbu",
    "recipe.styleOg",
    "recipe.styleRbr",
    "recipe.sumDryHopPerLiter",
    "recipe.tags",
    "recipe.teaser",
    "recipe.type",
    "recipe.water",
    "recipe.water.acidPhAdjustment",
    "recipe.water.enableAcidAdjustments",
    "recipe.water.enableSpargeAcidAdjustments",
    "recipe.water.enableSpargeAdjustments",
    "recipe.water.mash",
    "recipe.water.mash._created",
    "recipe.water.mash._created._nanoseconds",
    "recipe.water.mash._created._seconds",
    "recipe.water.mash._id",
    "recipe.water.mash._rev",
    "recipe.water.mash._timestamp",
    "recipe.water.mash._timestamp._nanoseconds",
    "recipe.water.mash._timestamp._seconds",
    "recipe.water.mash._version",
    "recipe.water.mash.alkalinity",
    "recipe.water.mash.anions",
    "recipe.water.mash.bicarbonate",
    "recipe.water.mash.bicarbonateMeqL",
    "recipe.water.mash.calcium",
    "recipe.water.mash.cations",
    "recipe.water.mash.chloride",
    "recipe.water.mash.hardness",
    "recipe.water.mash.ionBalance",
    "recipe.water.mash.ionBalanceOff",
    "recipe.water.mash.magnesium",
    "recipe.water.mash.name",
    "recipe.water.mash.residualAlkalinity",
    "recipe.water.mash.residualAlkalinityMeqLCalc",
    "recipe.water.mash.soClRatio",
    "recipe.water.mash.sodium",
    "recipe.water.mash.sulfate",
    "recipe.water.mashAdjustments",
    "recipe.water.mashAdjustments.acids",
    "recipe.water.mashAdjustments.acids",
    "recipe.water.mashAdjustments.acids.alkalinityMeqL",
    "recipe.water.mashAdjustments.acids.amount",
    "recipe.water.mashAdjustments.acids.concentration",
    "recipe.water.mashAdjustments.acids.type",
    "recipe.water.mashAdjustments.bicarbonate",
    "recipe.water.mashAdjustments.calcium",
    "recipe.water.mashAdjustments.calciumCarbonate",
    "recipe.water.mashAdjustments.calciumChloride",
    "recipe.water.mashAdjustments.calciumHydroxide",
    "recipe.water.mashAdjustments.calciumSulfate",
    "recipe.water.mashAdjustments.chloride",
    "recipe.water.mashAdjustments.magnesium",
    "recipe.water.mashAdjustments.magnesiumChloride",
    "recipe.water.mashAdjustments.magnesiumSulfate",
    "recipe.water.mashAdjustments.sodium",
    "recipe.water.mashAdjustments.sodiumBicarbonate",
    "recipe.water.mashAdjustments.sodiumChloride",
    "recipe.water.mashAdjustments.sulfate",
    "recipe.water.mashAdjustments.volume",
    "recipe.water.mashPh",
    "recipe.water.mashPhDistilled",
    "recipe.water.mashTargetDiff",
    "recipe.water.mashTargetDiff.alkalinity",
    "recipe.water.mashTargetDiff.anions",
    "recipe.water.mashTargetDiff.bicarbonate",
    "recipe.water.mashTargetDiff.bicarbonateMeqL",
    "recipe.water.mashTargetDiff.calcium",
    "recipe.water.mashTargetDiff.cations",
    "recipe.water.mashTargetDiff.chloride",
    "recipe.water.mashTargetDiff.hardness",
    "recipe.water.mashTargetDiff.ionBalance",
    "recipe.water.mashTargetDiff.ionBalanceOff",
    "recipe.water.mashTargetDiff.magnesium",
    "recipe.water.mashTargetDiff.residualAlkalinity",
    "recipe.water.mashTargetDiff.residualAlkalinityMeqLCalc",
    "recipe.water.mashTargetDiff.soClRatio",
    "recipe.water.mashTargetDiff.sodium",
    "recipe.water.mashTargetDiff.sulfate",
    "recipe.water.mashWaterAmount",
    "recipe.water.settings",
    "recipe.water.settings.adjustSparge",
    "recipe.water.settings.calciumChloride",
    "recipe.water.settings.calciumChloride.auto",
    "recipe.water.settings.calciumChloride.concentration",
    "recipe.water.settings.calciumChloride.form",
    "recipe.water.settings.calciumChloride.mash",
    "recipe.water.settings.calciumChloride.sparge",
    "recipe.water.settings.calciumHydroxide",
    "recipe.water.settings.calciumHydroxide.auto",
    "recipe.water.settings.calciumHydroxide.mash",
    "recipe.water.settings.calciumHydroxide.sparge",
    "recipe.water.settings.calciumSulfate",
    "recipe.water.settings.calciumSulfate.auto",
    "recipe.water.settings.calciumSulfate.mash",
    "recipe.water.settings.calciumSulfate.sparge",
    "recipe.water.settings.magnesiumSulfate",
    "recipe.water.settings.magnesiumSulfate.auto",
    "recipe.water.settings.magnesiumSulfate.mash",
    "recipe.water.settings.magnesiumSulfate.sparge",
    "recipe.water.settings.sodiumBicarbonate",
    "recipe.water.settings.sodiumBicarbonate.auto",
    "recipe.water.settings.sodiumBicarbonate.mash",
    "recipe.water.settings.sodiumBicarbonate.sparge",
    "recipe.water.settings.sodiumChloride",
    "recipe.water.settings.sodiumChloride.auto",
    "recipe.water.settings.sodiumChloride.mash",
    "recipe.water.settings.sodiumChloride.sparge",
    "recipe.water.source",
    "recipe.water.source._created",
    "recipe.water.source._created._nanoseconds",
    "recipe.water.source._created._seconds",
    "recipe.water.source._id",
    "recipe.water.source._rev",
    "recipe.water.source._timestamp",
    "recipe.water.source._timestamp._nanoseconds",
    "recipe.water.source._timestamp._seconds",
    "recipe.water.source._version",
    "recipe.water.source.alkalinity",
    "recipe.water.source.anions",
    "recipe.water.source.bicarbonate",
    "recipe.water.source.bicarbonateMeqL",
    "recipe.water.source.calcium",
    "recipe.water.source.cations",
    "recipe.water.source.chloride",
    "recipe.water.source.hardness",
    "recipe.water.source.ionBalance",
    "recipe.water.source.ionBalanceOff",
    "recipe.water.source.magnesium",
    "recipe.water.source.name",
    "recipe.water.source.residualAlkalinity",
    "recipe.water.source.residualAlkalinityMeqLCalc",
    "recipe.water.source.soClRatio",
    "recipe.water.source.sodium",
    "recipe.water.source.sulfate",
    "recipe.water.sourceTargetDiff",
    "recipe.water.sourceTargetDiff.alkalinity",
    "recipe.water.sourceTargetDiff.anions",
    "recipe.water.sourceTargetDiff.bicarbonate",
    "recipe.water.sourceTargetDiff.bicarbonateMeqL",
    "recipe.water.sourceTargetDiff.calcium",
    "recipe.water.sourceTargetDiff.cations",
    "recipe.water.sourceTargetDiff.chloride",
    "recipe.water.sourceTargetDiff.hardness",
    "recipe.water.sourceTargetDiff.ionBalance",
    "recipe.water.sourceTargetDiff.ionBalanceOff",
    "recipe.water.sourceTargetDiff.magnesium",
    "recipe.water.sourceTargetDiff.residualAlkalinity",
    "recipe.water.sourceTargetDiff.residualAlkalinityMeqLCalc",
    "recipe.water.sourceTargetDiff.soClRatio",
    "recipe.water.sourceTargetDiff.sodium",
    "recipe.water.sourceTargetDiff.sulfate",
    "recipe.water.sparge",
    "recipe.water.sparge._created",
    "recipe.water.sparge._created._nanoseconds",
    "recipe.water.sparge._created._seconds",
    "recipe.water.sparge._id",
    "recipe.water.sparge._rev",
    "recipe.water.sparge._timestamp",
    "recipe.water.sparge._timestamp._nanoseconds",
    "recipe.water.sparge._timestamp._seconds",
    "recipe.water.sparge._version",
    "recipe.water.sparge.alkalinity",
    "recipe.water.sparge.anions",
    "recipe.water.sparge.bicarbonate",
    "recipe.water.sparge.bicarbonateMeqL",
    "recipe.water.sparge.calcium",
    "recipe.water.sparge.cations",
    "recipe.water.sparge.chloride",
    "recipe.water.sparge.hardness",
    "recipe.water.sparge.ionBalance",
    "recipe.water.sparge.ionBalanceOff",
    "recipe.water.sparge.magnesium",
    "recipe.water.sparge.name",
    "recipe.water.sparge.residualAlkalinity",
    "recipe.water.sparge.residualAlkalinityMeqLCalc",
    "recipe.water.sparge.soClRatio",
    "recipe.water.sparge.sodium",
    "recipe.water.sparge.sulfate",
    "recipe.water.spargeAcidPhAdjustment",
    "recipe.water.spargeAdjustments",
    "recipe.water.spargeAdjustments.acids",
    "recipe.water.spargeAdjustments.acids",
    "recipe.water.spargeAdjustments.acids.amount",
    "recipe.water.spargeAdjustments.acids.concentration",
    "recipe.water.spargeAdjustments.acids.type",
    "recipe.water.spargeAdjustments.bicarbonate",
    "recipe.water.spargeAdjustments.calcium",
    "recipe.water.spargeAdjustments.chloride",
    "recipe.water.spargeAdjustments.magnesium",
    "recipe.water.spargeAdjustments.sodium",
    "recipe.water.spargeAdjustments.sulfate",
    "recipe.water.spargeAdjustments.volume",
    "recipe.water.spargeTargetDiff",
    "recipe.water.spargeTargetDiff.alkalinity",
    "recipe.water.spargeTargetDiff.anions",
    "recipe.water.spargeTargetDiff.bicarbonate",
    "recipe.water.spargeTargetDiff.bicarbonateMeqL",
    "recipe.water.spargeTargetDiff.calcium",
    "recipe.water.spargeTargetDiff.cations",
    "recipe.water.spargeTargetDiff.chloride",
    "recipe.water.spargeTargetDiff.hardness",
    "recipe.water.spargeTargetDiff.ionBalance",
    "recipe.water.spargeTargetDiff.ionBalanceOff",
    "recipe.water.spargeTargetDiff.magnesium",
    "recipe.water.spargeTargetDiff.residualAlkalinity",
    "recipe.water.spargeTargetDiff.residualAlkalinityMeqLCalc",
    "recipe.water.spargeTargetDiff.soClRatio",
    "recipe.water.spargeTargetDiff.sodium",
    "recipe.water.spargeTargetDiff.sulfate",
    "recipe.water.spargeWaterAmount",
    "recipe.water.style",
    "recipe.water.target",
    "recipe.water.target._created",
    "recipe.water.target._created._nanoseconds",
    "recipe.water.target._created._seconds",
    "recipe.water.target._id",
    "recipe.water.target._timestamp",
    "recipe.water.target._timestamp._nanoseconds",
    "recipe.water.target._timestamp._seconds",
    "recipe.water.target.alkalinity",
    "recipe.water.target.anions",
    "recipe.water.target.bicarbonate",
    "recipe.water.target.bicarbonateMeqL",
    "recipe.water.target.calcium",
    "recipe.water.target.cations",
    "recipe.water.target.chloride",
    "recipe.water.target.hardness",
    "recipe.water.target.ionBalance",
    "recipe.water.target.ionBalanceOff",
    "recipe.water.target.magnesium",
    "recipe.water.target.name",
    "recipe.water.target.residualAlkalinity",
    "recipe.water.target.residualAlkalinityMeqLCalc",
    "recipe.water.target.soClRatio",
    "recipe.water.target.sodium",
    "recipe.water.target.sulfate",
    "recipe.water.total",
    "recipe.water.total._created",
    "recipe.water.total._created._nanoseconds",
    "recipe.water.total._created._seconds",
    "recipe.water.total._id",
    "recipe.water.total._rev",
    "recipe.water.total._timestamp",
    "recipe.water.total._timestamp._nanoseconds",
    "recipe.water.total._timestamp._seconds",
    "recipe.water.total._version",
    "recipe.water.total.alkalinity",
    "recipe.water.total.anions",
    "recipe.water.total.bicarbonate",
    "recipe.water.total.bicarbonateMeqL",
    "recipe.water.total.calcium",
    "recipe.water.total.cations",
    "recipe.water.total.chloride",
    "recipe.water.total.hardness",
    "recipe.water.total.ionBalance",
    "recipe.water.total.ionBalanceOff",
    "recipe.water.total.magnesium",
    "recipe.water.total.name",
    "recipe.water.total.residualAlkalinity",
    "recipe.water.total.residualAlkalinityMeqLCalc",
    "recipe.water.total.soClRatio",
    "recipe.water.total.sodium",
    "recipe.water.total.sulfate",
    "recipe.water.totalAdjustments",
    "recipe.water.totalAdjustments.acids",
    "recipe.water.totalAdjustments.acids",
    "recipe.water.totalAdjustments.acids.alkalinityMeqL",
    "recipe.water.totalAdjustments.acids.amount",
    "recipe.water.totalAdjustments.acids.concentration",
    "recipe.water.totalAdjustments.acids.type",
    "recipe.water.totalAdjustments.bicarbonate",
    "recipe.water.totalAdjustments.calcium",
    "recipe.water.totalAdjustments.calciumCarbonate",
    "recipe.water.totalAdjustments.calciumChloride",
    "recipe.water.totalAdjustments.calciumHydroxide",
    "recipe.water.totalAdjustments.calciumSulfate",
    "recipe.water.totalAdjustments.chloride",
    "recipe.water.totalAdjustments.magnesium",
    "recipe.water.totalAdjustments.magnesiumChloride",
    "recipe.water.totalAdjustments.magnesiumSulfate",
    "recipe.water.totalAdjustments.sodium",
    "recipe.water.totalAdjustments.sodiumBicarbonate",
    "recipe.water.totalAdjustments.sodiumChloride",
    "recipe.water.totalAdjustments.sulfate",
    "recipe.water.totalAdjustments.volume",
    "recipe.water.totalTargetDiff",
    "recipe.water.totalTargetDiff.alkalinity",
    "recipe.water.totalTargetDiff.anions",
    "recipe.water.totalTargetDiff.bicarbonate",
    "recipe.water.totalTargetDiff.bicarbonateMeqL",
    "recipe.water.totalTargetDiff.calcium",
    "recipe.water.totalTargetDiff.cations",
    "recipe.water.totalTargetDiff.chloride",
    "recipe.water.totalTargetDiff.hardness",
    "recipe.water.totalTargetDiff.ionBalance",
    "recipe.water.totalTargetDiff.ionBalanceOff",
    "recipe.water.totalTargetDiff.magnesium",
    "recipe.water.totalTargetDiff.residualAlkalinity",
    "recipe.water.totalTargetDiff.residualAlkalinityMeqLCalc",
    "recipe.water.totalTargetDiff.soClRatio",
    "recipe.water.totalTargetDiff.sodium",
    "recipe.water.totalTargetDiff.sulfate",
    "recipe.yeast",
    "recipe.yeast.actualPacks",
    "recipe.yeast.calcStarterVol",
    "recipe.yeast.calcViablity",
    "recipe.yeast.cellsPerLiquidPkg",
    "recipe.yeast.cellsPrGramDry",
    "recipe.yeast.gramsPerDryPkg",
    "recipe.yeast.growthModel",
    "recipe.yeast.initCells",
    "recipe.yeast.manufacturingDate",
    "recipe.yeast.millionCellsPerMl",
    "recipe.yeast.mode",
    "recipe.yeast.og",
    "recipe.yeast.overbuildCells",
    "recipe.yeast.packs",
    "recipe.yeast.packsPitchCells",
    "recipe.yeast.pitchCells",
    "recipe.yeast.pitchRateActual",
    "recipe.yeast.pitchRatePkg",
    "recipe.yeast.purePitch",
    "recipe.yeast.rate",
    "recipe.yeast.rehydrate",
    "recipe.yeast.startType",
    "recipe.yeast.starterPackages",
    "recipe.yeast.steps",
    "recipe.yeast.steps",
    "recipe.yeast.steps.growthFactor",
    "recipe.yeast.steps.harvestRatio",
    "recipe.yeast.steps.inoculationRate",
    "recipe.yeast.steps.startCells",
    "recipe.yeast.steps.startGravity",
    "recipe.yeast.steps.startVol",
    "recipe.yeast.steps.starterGramExtract",
    "recipe.yeast.steps.starterGramLiquidExtract",
    "recipe.yeast.steps.starterMillionCellsPerMl",
    "recipe.yeast.steps.starterNewCellCount",
    "recipe.yeast.steps.starterPitchCellCount",
    "recipe.yeast.steps.starterPitchRate",
    "recipe.yeast.type",
    "recipe.yeast.viability",
    "recipe.yeast.volume",
    "recipe.yeastToleranceExceededBy",
    "recipe.yeasts",
    "recipe.yeasts",
    "recipe.yeasts._id",
    "recipe.yeasts.amount",
    "recipe.yeasts.attenuation",
    "recipe.yeasts.description",
    "recipe.yeasts.fermentsAll",
    "recipe.yeasts.flocculation",
    "recipe.yeasts.form",
    "recipe.yeasts.laboratory",
    "recipe.yeasts.manufacturingDate",
    "recipe.yeasts.maxAbv",
    "recipe.yeasts.maxAttenuation",
    "recipe.yeasts.maxTemp",
    "recipe.yeasts.minAttenuation",
    "recipe.yeasts.minTemp",
    "recipe.yeasts.name",
    "recipe.yeasts.productId",
    "recipe.yeasts.starter",
    "recipe.yeasts.starterGramExtract",
    "recipe.yeasts.starterSize",
    "recipe.yeasts.type",
    "recipe.yeasts.unit",
    "recipe.yeasts.userNotes",
    "status",
];
