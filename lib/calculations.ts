import { BuildInput } from '../types/build';

export function calculateDPS(build: BuildInput): number {
  // Base DPS calculation: (Melee * 0.5 + Sword * 0.3 + Fruit * 0.2 + Gun * 0.1) * (Level / 100)
  let base = (
    build.stats.melee * 0.5 + 
    build.stats.sword * 0.3 + 
    build.stats.fruit * 0.2 + 
    build.stats.gun * 0.1
  ) * (build.level / 100);
  
  // Apply item multipliers
  base *= getItemMultiplier(build.equipped.fruit, build.equipped.sword, build.equipped.accessories);
  
  return Math.round(base);
}

function getItemMultiplier(fruit: string, sword: string, accessories: string[]): number {
  let multiplier = 1.0;
  
  // Fruit multipliers
  switch (fruit) {
    case 'Dragon':
      multiplier *= 1.5;
      break;
    case 'Leopard':
      multiplier *= 1.3;
      break;
    case 'Mammoth':
      multiplier *= 1.4;
      break;
    case 'Kitsune':
      multiplier *= 1.35;
      break;
    case 'Phoenix':
      multiplier *= 1.45;
      break;
    case 'Ryu':
      multiplier *= 1.6;
      break;
    case 'String':
      multiplier *= 1.2;
      break;
    case 'Dark':
      multiplier *= 1.4;
      break;
    case 'Light':
      multiplier *= 1.35;
      break;
    case 'Venom':
      multiplier *= 1.25;
      break;
    case 'Ice':
      multiplier *= 1.2;
      break;
    case 'Fire':
      multiplier *= 1.25;
      break;
    case 'Quake':
      multiplier *= 1.55;
      break;
    case 'Hawk':
      multiplier *= 1.3;
      break;
    default:
      // 'None' or other values don't add a multiplier
      break;
  }
  
  // Sword multipliers
  switch (sword) {
    case 'Tushita':
      multiplier *= 1.2;
      break;
    case 'Yama':
      multiplier *= 1.35;
      break;
    case 'Enma':
      multiplier *= 1.4;
      break;
    case 'Shark Anchor':
      multiplier *= 1.25;
      break;
    case 'Girahaku':
      multiplier *= 1.15;
      break;
    case 'Ashura':
      multiplier *= 1.3;
      break;
    case 'Ame no Habakiri':
      multiplier *= 1.25;
      break;
    case 'Kabutowari':
      multiplier *= 1.2;
      break;
    case 'Nodachi':
      multiplier *= 1.15;
      break;
    case 'Katana':
      multiplier *= 1.1;
      break;
    default:
      // 'None' or other values don't add a multiplier
      break;
  }
  
  // Accessory multipliers (each accessory adds 0.1 to multiplier)
  multiplier += accessories.length * 0.1;
  
  // Ensure minimum multiplier of 1.0
  return Math.max(multiplier, 1.0);
}