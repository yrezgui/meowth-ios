//
//  AudioRecorder.m
//  meowth
//
//  Created by Yacine Rezgui on 26/07/2015.
//  Copyright (c) 2015 Yacine Rezgui. All rights reserved.
//

#import "AudioRecorder.h"

@implementation AudioRecorder {
  AVAudioRecorder *_audioRecorder;
}

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  return @{
    @"AudioQuality": @{
      @"MIN": @(AVAudioQualityMin),
      @"LOW": @(AVAudioQualityLow),
      @"MEDIUM": @(AVAudioQualityMedium),
      @"HIGH": @(AVAudioQualityHigh),
      @"MAX": @(AVAudioQualityMax),
      @"MIN": @(AVAudioQualityMin),
    }
  };
}

RCT_EXPORT_METHOD(setup:(NSString *)filename :(RCTResponseSenderBlock)callback)
{
  NSString*     fullPath  = [NSHomeDirectory() stringByAppendingPathComponent:filename];
  NSURL*        fileUrl   = [NSURL fileURLWithPath:fullPath];
  NSError*      err       = nil;
  NSDictionary* settings  = @{
    AVEncoderAudioQualityKey: [NSNumber numberWithInt:AVAudioQualityHigh],
    AVSampleRateKey: [NSNumber numberWithInt:48000],
    AVNumberOfChannelsKey: [NSNumber numberWithInt:2],
};
  
  RCTLogInfo(@"Create audio file: %@", fullPath);
  _audioRecorder = [[AVAudioRecorder alloc] initWithURL:fileUrl settings:settings error:&err];
  callback(@[fullPath]);
}

RCT_EXPORT_METHOD(start)
{
  RCTLogInfo(@"Start recording");
  [_audioRecorder record];
}

RCT_EXPORT_METHOD(stop)
{
  RCTLogInfo(@"Stop recording");
  [_audioRecorder stop];
}

@end
