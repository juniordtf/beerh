package com.beerh;

import android.app.AlertDialog;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.provider.Settings;
import android.util.Log;

import com.beerh.service.BeerHService;
import com.beerh.service.NotificationService;
import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

import java.util.Arrays;

public class MainActivity extends ReactActivity implements ServiceConnection {
    private BeerHService beerHService;
    private String TAG = "MainActivity";
    final private int REQUEST_CODE_ASK_PERMISSIONS = 123;
    private OnRequestPermissionsResultCallback onRequestPermissionsResultSuccessCallback;
    private OnRequestPermissionsResultCallback onRequestPermissionsResultFailCallback;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);

        checkPermissions();
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

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        Log.d(TAG, Arrays.toString(new String[]{"onRequestPermissionsResult", String.valueOf(requestCode), Arrays.toString(permissions), Arrays.toString(grantResults)}));
//        CalendarEventsPackage.onRequestPermissionsResult(requestCode, permissions, grantResults);

        switch(requestCode){
            case REQUEST_CODE_ASK_PERMISSIONS:
                if(grantResults[0] == PackageManager.PERMISSION_GRANTED){
                    this.onRequestPermissionsResultSuccessCallback.callback();
                } else{
                   this.onRequestPermissionsResultFailCallback.callback();
                }
                break;
            default:
                super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
    }

    public interface OnRequestPermissionsResultCallback{
        void callback();
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

    public void checkPermissions() {
        ComponentName cn = new ComponentName(this, NotificationService.class);
        String flat = Settings.Secure.getString(getContentResolver(), "enabled_notification_listeners");
        final boolean enabled = flat != null && flat.contains(cn.flattenToString());

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
            if (!Settings.canDrawOverlays(this)) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + getPackageName()));
                startActivityForResult(intent, 0);
            }

            if(!enabled){
                new AlertDialog.Builder(this)
                        .setTitle(getString(R.string.ask_notification_listener_permission_message_title))
                        .setMessage(getString(R.string.ask_notification_listener_permission_message))
                        .setCancelable(false)
                        .setNegativeButton(getString(R.string.no), new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int i) {
                                dialog.dismiss();
                            }
                        })
                        .setPositiveButton(getString(R.string.yes), new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                dialog.cancel();
                                getApplicationContext().startActivity(new Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
                            }
                        })
                        .show();
            }
        }
    }

    @Override
    public void onBackPressed() {

    }
}
