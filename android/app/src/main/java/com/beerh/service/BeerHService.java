package com.beerh.service;

import android.app.Notification;
import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.util.Log;

import com.beerh.helpers.NotificationHelper;


public class BeerHService extends Service {
    private static final String TAG = "BeerHService";
    private static String displayTitle = "";
    private static String displayMessage = "";

    public class BeerHBinder extends Binder{
        public BeerHService getService(){ return BeerHService.this; }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return new BeerHBinder();
    }

    @Override
    public void onCreate() {
        super.onCreate();
        startForegroundService();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        //stopForegroundService();
    }

    private void startForegroundService(){
        Log.d(TAG, "Starting Foreground Service");

        Notification notification = NotificationHelper.getInstance(this).getServiceNotification(displayTitle, displayMessage);

        //start foreground service
        startForeground(NotificationHelper.SERVICE_ID, notification);
    }
}
