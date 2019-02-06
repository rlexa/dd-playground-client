import { entity_, modifier_, npc_, ppc_, VARIANT_DEFAULT } from './game-down';

export const modBlocking = modifier_('blocking');
export const modDamageMaxIncoming = modifier_('damage-max-incoming');
export const modDestructible = modifier_('destructible');
export const modFlammable = modifier_('flammable');
export const modHealth = modifier_('health');
export const modHealthMax = modifier_('health-max');
export const modHovering = modifier_('hovering');
export const modInitiative = modifier_('initiative');
export const modLootable = modifier_('lootable');

export const modsHealthy = (val: number) => [modHealthMax(val), modHealth(val)];

export const VARIANT_BUILDING_SINGLE = VARIANT_DEFAULT;
export const VARIANT_BUILDING_DOUBLE = VARIANT_BUILDING_SINGLE + 1;

export const entityBuilding = (variant = VARIANT_DEFAULT) => entity_('building', variant)([modHealth(1), modBlocking(), modDestructible()]);
export const entityForest = (variant = VARIANT_DEFAULT) => entity_('tree', variant)([modHealth(1), modDestructible(), modFlammable()]);
export const entityLoot = (variant = VARIANT_DEFAULT) => entity_('loot', variant)([modHealth(1), modDestructible(), modLootable()]);
export const entityMountain = (variant = VARIANT_DEFAULT) => entity_('mountain', variant)([modHealth(2), modBlocking(), modDamageMaxIncoming(1), modDestructible()]);

export const ppcBotArtillery = (variant = VARIANT_DEFAULT) => ppc_('bot_artillery', variant)([...modsHealthy(2), modBlocking(), modDestructible()]);
export const ppcBotHeavy = (variant = VARIANT_DEFAULT) => ppc_('bot_heavy', variant)([...modsHealthy(4), modBlocking(), modDestructible()]);
export const ppcBotTank = (variant = VARIANT_DEFAULT) => ppc_('bot_tank', variant)([...modsHealthy(3), modBlocking(), modDestructible()]);

export const npcBugBarfer = (variant = VARIANT_DEFAULT) => npc_('bug_barfer', variant)([modHealth(3), modInitiative(2), modBlocking(), modDestructible()]);
export const npcBugBomber = (variant = VARIANT_DEFAULT) => npc_('bug_bomber', variant)([modHealth(3), modInitiative(1), modBlocking(), modDestructible()]);
export const npcBugCrawler = (variant = VARIANT_DEFAULT) => npc_('bug_crawler', variant)([modHealth(3), modInitiative(4), modBlocking(), modDestructible()]);
export const npcBugFlyer = (variant = VARIANT_DEFAULT) => npc_('bug_flier', variant)([modHealth(2), modInitiative(5), modBlocking(), modDestructible(), modHovering()]);
export const npcBugSpitter = (variant = VARIANT_DEFAULT) => npc_('bug_spitter', variant)([modHealth(2), modInitiative(3), modBlocking(), modDestructible()]);
