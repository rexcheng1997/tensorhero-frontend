/* eslint-disable max-len */
type testFormat = {
  [key: string]: {
    data: Object, spaces: number, result: string,
  },
};

const testData: Readonly<testFormat> = {
  test1: {
    data: {
      Song: {
        Name: 'Song A',
        Artist: 'Person A',
      },
      SyncTrack: {
        TimeSignatureChanges: [[0, 4]],
        BPMChanges: [[0, 110], [768, 134]],
      },
      Events: [],
      ExpertSingle: [{
        tick: 60,
        type: 'N',
        description: 0,
        sustainLength: 10,
      }],
    },
    spaces: 2,
    result: '{<br>&nbsp;&nbsp;"Song":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"Name":&nbsp;"Song&nbsp;A",<br>&nbsp;&nbsp;&nbsp;&nbsp;"Artist":&nbsp;"Person&nbsp;A"<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"SyncTrack":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"TimeSignatureChanges":&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;"BPMChanges":&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;110<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;768,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;134<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"Events":&nbsp;[],<br>&nbsp;&nbsp;"ExpertSingle":&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tick":&nbsp;60,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"type":&nbsp;"N",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"description":&nbsp;0,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sustainLength":&nbsp;10<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}',
  },
} as const;

export default testData;
