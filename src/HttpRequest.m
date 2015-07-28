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

RCT_EXPORT_METHOD(postFile:(NSString *)url headers:(NSDictionary *)headers filePath:(NSString *)filePath callback:(RCTResponseSenderBlock)callback)
{
  
  NSData *fileData = [NSData dataWithContentsOfFile:filePath];
  
  NSMutableURLRequest *request = [NSMutableURLRequest
                                  requestWithURL:[NSURL URLWithString:url]
                                  cachePolicy:NSURLRequestUseProtocolCachePolicy
                                  timeoutInterval:10.0
                                  ];
  
  [request setHTTPMethod:@"POST"];
  [request setAllHTTPHeaderFields:headers];
  [request setHTTPBody:fileData];
  
  NSURLSession *session = [NSURLSession sharedSession];
  NSURLSessionDataTask *dataTask = [session
                                    dataTaskWithRequest:request
                                    completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                      NSString* responseBody = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                                      
                                      if (error) {
                                        callback(@[error, responseBody]);
                                      } else {
                                        callback(@[[NSNull null], responseBody]);
                                      }
                                    }
                                    ];
  
  [dataTask resume];
  
}

@end
