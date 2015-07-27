//
//  HttpRequest.m
//  meowth
//
//  Created by Yacine Rezgui on 27/07/2015.
//  Copyright (c) 2015 Yacine Rezgui. All rights reserved.
//

#import "HttpRequest.h"

@implementation HttpRequest

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(postFile:(NSString *)url headers:(NSDictionary *)headers file:(NSString *)file)
{
  RCTLogInfo(@"Send POST request %@", file);
}

@end
