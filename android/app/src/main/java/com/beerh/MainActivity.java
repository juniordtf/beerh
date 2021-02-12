package com.beerh;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;

import com.beerh.service.BeerHService;
import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity implements ServiceConnection {
    private BeerHService beerHService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);

        showPermissionDialog();
        startBeerHService();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if(beerHService != null){
            Log.d("BeerH", "Stopping Foreground Service");
            unRegisterListeners(beerHService);
            getApplicationContext().unbindService(MainActivity.this);
            beerHService = null;
            stopService(new Intent(this, BeerHService.class));
        }
    }

    @Override
    protected String getMainComponentName() {
        return "BeerH";
    }

    private void startBeerHService(){
        final Intent intent = new Intent(getApplicationContext(), BeerHService.class);

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
            getApplicationContext().startForegroundService(intent);
        } else{
            getApplicationContext().startService(intent);
        }

        getApplicationContext().bindService(intent, MainActivity.this, Context.BIND_AUTO_CREATE);
    }

    @Override
    public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
        Log.d("BeerH Service", "Service Connected");
        beerHService = ((BeerHService.BeerHBinder) (iBinder)).getService();
    }

    @Override
    public void onServiceDisconnected(ComponentName componentName) {
        Log.d("BeerH Service", "Service Disconnected");
        unRegisterListeners(beerHService);
        beerHService = null;
    }

    private void unRegisterListeners( BeerHService beerHService){
        if(beerHService != null){
            //TODO Unregister listeners here
        }
    }

    public void showPermissionDialog() {
        getApplicationContext().startActivity(new Intent("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS").addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
    }
}
