import { testPureFunction } from "../../../../shared/testing-utility/testPureFunction";
import { getResolutionFromScaleDegree } from "./getResolutionFromScaleDegree";

/**
 * General rules:
 * 1-4 resolve down. 5-7 resolve up
 * Choose a mode that works with the included note
 * If possible it should comply with cadence as well
 * If there is still more than one option choose the more popular one
 * */

describe('getResolutionFromScaleDegree', function () {
  testPureFunction(getResolutionFromScaleDegree, [
    {
      args: ['1', ['1'], 'I IV V I'],
      returnValue: ['1'],
    },
    {
      args: ['2', ['1', '2'], 'I IV V I'],
      returnValue: ['2', '1'],
    },
    {
      args: ['3', ['1', '2', '3'], 'I IV V I'],
      returnValue: ['3', '2', '1'],
    },
    {
      args: ['b3', ['1', '2', '3', 'b3'], 'I IV V I'],
      returnValue: ['b3', '3', '2', '1'], // blues is implied
    },
    {
      args: ['b3', ['1', '2', 'b3'], 'I IV V I'],
      returnValue: ['b3', '2', '1'], // minor is assumed since natural '3' is not included
    },
    {
      args: ['4', ['1', '2', '4'], 'I IV V I'],
      returnValue: ['4', '3', '2', '1'], // major is assumed because of cadence
    },
    {
      args: ['4', ['1', '2', '3', '4'], 'I IV V I'],
      returnValue: ['4', '3', '2', '1'],
    },
    {
      args: ['4', ['1', '2', '4'], 'i iv V i'],
      returnValue: ['4', 'b3', '2', '1'],
    },
    {
      args: ['4', ['1', '2', '4'], 'i iv V i'],
      returnValue: ['4', 'b3', '2', '1'],
    },
    {
      args: ['4', ['1', 'b2', '4'], 'i iv V i'],
      returnValue: ['4', 'b3', 'b2', '1'],
    },
    {
      args: ['4', ['1', 'b2', '4'], 'I IV V I'], // notes take precedence and minor is implied here
      returnValue: ['4', 'b3', 'b2', '1'],
    },
    {
      args: ['4', ['1', '2', 'b3', '3', '4'], 'I IV V I'],
      returnValue: ['4', '3', '2', '1'],
    },
    {
      args: ['4', ['1', '2', 'b3', '3', '4'], 'i iv V i'],
      returnValue: ['4', 'b3', '2', '1'],
    },
    {
      args: ['#4', ['1', '#4'], 'I IV V I'], // lydian
      returnValue: ['#4', '3', '2', '1'],
    },
    {
      args: ['#4', ['1', '#4', '4'], 'I IV V I'],
      returnValue: ['#4', /*'5', */ '4', '3', '2', '1'], // we might want to change that in the future
    },
    {
      args: ['5', ['5'], 'I IV V I'],
      returnValue: ['5', '6', '7', '1'],
    },
    {
      args: ['5', ['5', '6', '7'], 'I IV V I'],
      returnValue: ['5', '6', '7', '1'],
    },
    {
      args: ['5', ['5', 'b6', '7'], 'i iv V i'],
      returnValue: ['5', 'b6', '7', '1'], // harmonic minor is implied
    },
    {
      args: ['5', ['5', 'b7'], 'i iv V i'],
      returnValue: ['5', 'b6', 'b7', '1'], // minor is assumed over mixolydian
    },
    {
      args: ['5', ['5', '6', 'b7'], 'I IV V I'],
      returnValue: ['5', '6', 'b7', '1'],
    },
  ]);
});
