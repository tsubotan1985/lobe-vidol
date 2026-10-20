import { MotionFileType } from './type';

export enum MotionPresetName {
  FemaleHappy = 'female_happy', //开心
  FemaleAngry = 'female_angry', //生气
  FemaleGreeting = 'female_greeting', //招呼
  FemaleAppeal = 'female_appeal', // 吸引
  Idle = 'idle', //空闲
  FemaleCoverUndies = 'female_cover_undies',
  FemaleKiss = 'female_kiss',
  NumberMeter1 = 'number_meter_1',
  NumberMeter2 = 'number_meter_2',
  NumberMeter3 = 'number_meter_3',
  NumberMeter4 = 'number_meter_4',
  NumberMeter5 = 'number_meter_5',
  FemaleCoverChest = 'female_cover_chest',
  FemaleStand = 'female_stand',
  FemaleStandMix = 'female_stand_mix',
  MaleHappy = 'male_happy',
  MaleAngry = 'male_angry',
}

export const motionPresetMap: Record<
  MotionPresetName,
  {
    url: string;
    type: MotionFileType;
    name: string;
  }
> = {
  idle: {
    // 外部モーションは配信停止しているため使わない（待機はmodel.tsの自前モーション）
    url: '',
    type: MotionFileType.VMD,
    name: 'Female/Stand',
  },
  female_happy: {
    url: '',
    type: MotionFileType.FBX,
    name: 'Female/Happy',
  },
  male_happy: {
    url: '',
    type: MotionFileType.FBX,
    name: 'Male/Happy',
  },
  female_angry: {
    url: '',
    type: MotionFileType.FBX,
    name: 'Female/Angry',
  },
  male_angry: {
    url: '',
    type: MotionFileType.FBX,
    name: 'Male/Angry',
  },
  female_greeting: {
    url: '',
    type: MotionFileType.FBX,
    name: 'Female/Greeting',
  },
  female_appeal: {
    url: '',
    type: MotionFileType.VMD,
    name: 'Female/Appeal',
  },
  // 新增的配置
  female_cover_undies: {
    url: '',
    type: MotionFileType.VMD,
    name: 'Female/Cover Undies',
  },
  female_kiss: {
    url: '',
    type: MotionFileType.VMD,
    name: 'Female/Kiss',
  },
  number_meter_1: {
    url: '',
    type: MotionFileType.VMD,
    name: 'Number Meter 1',
  },
  number_meter_2: {
    url: '',
    type: MotionFileType.VMD,
    name: 'Number Meter 2',
  },
  number_meter_3: {
    url: '',
    type: MotionFileType.VMD,
    name: 'Number Meter 3',
  },
  number_meter_4: {
    url: '',
    type: MotionFileType.VMD,
    name: 'Number Meter 4',
  },
  number_meter_5: {
    url: '',
    type: MotionFileType.VMD,
    name: 'Number Meter 5',
  },
  female_cover_chest: {
    url: '',
    type: MotionFileType.VMD,
    name: 'Female/Cover Chest',
  },
  female_stand: {
    url: '',
    type: MotionFileType.VMD,
    name: 'Female/Stand',
  },
  female_stand_mix: {
    url: '',
    type: MotionFileType.VMD,
    name: 'Female/Stand Mix',
  },
};
